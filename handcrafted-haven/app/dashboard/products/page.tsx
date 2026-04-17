"use client";

import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  sellerId?: string | number;
  seller?: { name: string; email: string }; // added seller info
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState<string | null>(null);
  const [category,setCategory] = useState("Jewelry");
  const [editingId,setEditingId] = useState<number | null>(null);

  // Load saved products
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(saved);
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = ()=>setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName(""); setPrice(""); setDescription(""); setImage(null); setCategory("Jewelry"); setEditingId(null);
  }

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!loggedInUser.name) { alert("You must be logged in to add products"); return; }

    // Update this part in your addProduct function
const newProd: Product = {
  id: Date.now(),
  name,
  price: Number(price),
  description,
  image: image || "",
  category,
  // Add this line so ProductDetails can find the seller
  sellerId: loggedInUser.id || loggedInUser.email, 
  seller: {
    name: loggedInUser.name,
    email: loggedInUser.email
  }
};


    saveProducts([...products,newProd]);
    resetForm();
  }

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price.toString());
    setDescription(p.description);
    setImage(p.image||null);
    setCategory(p.category);
  }

  const updateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = products.map(p =>
      p.id===editingId
        ? { ...p, name, price:Number(price), description, image:image||"", category }
        : p
    );
    saveProducts(updated);
    resetForm();
  }

  const deleteProduct = (id:number) => {
    saveProducts(products.filter(p=>p.id!==id));
  }

  return (
    <div style={{padding:"20px", fontFamily:"Arial"}}>
      <h1>Manage Your Products</h1>

      <form onSubmit={editingId?updateProduct:addProduct} style={{marginBottom:"30px"}}>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={inputStyle} required/>
        <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} style={inputStyle} required/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={textareaStyle} required/>
        <select value={category} onChange={e=>setCategory(e.target.value)} style={inputStyle}>
          <option>Jewelry</option>
          <option>Woodwork</option>
          <option>Textiles</option>
          <option>Pottery</option>
          <option>Clothing</option>
          <option>Home Decor</option>
          <option>Art</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImage} style={{marginTop:"10px"}}/>
        {image && <div style={{marginTop:"10px"}}><p>Preview:</p><img src={image} alt="Preview" style={{width:"150px",borderRadius:"6px"}}/></div>}
        <button type="submit" style={buttonStyle}>{editingId?"Update Product":"Add Product"}</button>
      </form>

      <hr style={{margin:"40px 0"}}/>
      <h2>Your Products</h2>
      {products.length===0 && <p>No products yet.</p>}

      {products.map(p=>(
        <div key={p.id} style={productCard}>
          {p.image && <img src={p.image} alt={p.name} style={{width:"120px",borderRadius:"5px"}}/>}
          <div style={{flex:1}}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>
            <p>Category: {p.category}</p>
            <p><strong>Seller: {p.seller?.name}</strong></p>
            <button onClick={()=>startEdit(p)} style={editBtn}>Edit</button>
            <button onClick={()=>deleteProduct(p.id)} style={deleteBtn}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const inputStyle: React.CSSProperties = { display:"block", width:"100%", maxWidth:"300px", padding:"8px", marginTop:"10px" };
const textareaStyle: React.CSSProperties = { display:"block", width:"100%", maxWidth:"300px", padding:"8px", marginTop:"10px" };
const buttonStyle: React.CSSProperties = { marginTop:"15px", padding:"10px 15px", background:"#2c7a7b", color:"white", border:"none", borderRadius:"5px", cursor:"pointer" };
const productCard: React.CSSProperties = { display:"flex", flexDirection:"column", gap:"15px", border:"1px solid #ddd", padding:"15px", marginBottom:"15px", borderRadius:"6px" };
const editBtn: React.CSSProperties = { marginRight:"10px", padding:"6px 10px", background:"#3182ce", color:"white", border:"none", borderRadius:"4px" };
const deleteBtn: React.CSSProperties = { padding:"6px 10px", background:"#e53e3e", color:"white", border:"none", borderRadius:"4px" };