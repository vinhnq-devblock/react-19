import { memo, useState, useTransition } from "react";
import products from "./data";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  // const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();  // add this hook
  const setStyles = (currentTab) => {
    return {
      backgroundColor: activeTab === currentTab ? "#262626" : "white",
      color: activeTab === currentTab ? "white" : "black",
      marginRight: "12px",
      padding: "20px",
      fontSize: "20px",
      cursor: "pointer",
    };
  };
  const switchTab = (tab) => {
    startTransition(() => { // add this
      setActiveTab(tab);
    });
  };
  return (
    <main style={{ backgroundColor: "gray", height: "100vh" }}>
      <nav style={{ maxWidth: "80%", margin: "auto", paddingTop: "50px" }}>
        <button onClick={() => switchTab("home")} style={setStyles("home")}>
          Home
        </button>
        <button
          onClick={() => switchTab("products")}
          style={setStyles("products")}
        >
          Products
        </button>
        <button onClick={() => switchTab("about")} style={setStyles("about")}>
          About
        </button>
      </nav>
      <div style={{ color: "white", height: "auto", backgroundColor: "gray" }}>
        {isPending && <p>Loading...</p>}
        {!isPending && activeTab === "home" && <h1>Home Page</h1>}
        {!isPending && activeTab === "products" && <Products />}
        {!isPending && activeTab === "about" && <h1>About Page</h1>}
      </div>
    </main>
  );
};

const Products = memo(() => {
  let productList = products.map((product) => (
    <SlowProduct key={product.id} product={product} />
  ));
  return (
    <>
      <h1>Product Page</h1>
      <ul>{productList}</ul>
    </>
  );
});

const SlowProduct = ({ product }) => {
  const sleep = (ms) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  };
  sleep(1);
  return <li>Product: {product.name}</li>;
};
export default App;
