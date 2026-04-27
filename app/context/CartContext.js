"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // New state for Order History
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("shop-cart");
    const savedOrders = localStorage.getItem("shop-orders");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("shop-cart", JSON.stringify(cart));
      localStorage.setItem("shop-orders", JSON.stringify(orders));
    }
  }, [cart, orders, isInitialized]);

  const addToCart = (product) => {
    let isNew = false;
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        isNew = false;
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      isNew = true;
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(isNew ? "Added to cart!" : "Quantity updated!", { icon: isNew ? '🛍️' : '🔄' });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed");
  };
  
  const updateQty = (id, val) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + val) } : item));
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.qty, 0) * 80 + 150,
      date: new Date().toLocaleDateString(),
      status: "Delivered", // Mock status
      ...orderDetails
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQty, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);