import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

// Distance Calculation Function
function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

function Home() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [userLocation,
    setUserLocation] =
    useState(null);

  // Get User Location + Fetch Products
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setUserLocation({

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

        });

      },

      (error) => {

        console.log(error);

      }
    );

    fetchProducts();

  }, []);

  // Fetch Products
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      console.log(
        "Products API:",
        res.data
      );

      if (
        Array.isArray(res.data)
      ) {

        setProducts(res.data);

      } else {

        console.log(
          "Products response is not array"
        );

        setProducts([]);
      }

    } catch (error) {

      console.log(
        "Fetch Products Error:",
        error
      );

      setProducts([]);
    }
  };

  // Filter Products
  const filteredProducts =
    Array.isArray(products)

      ? products.filter(
          (product) => {

            const matchesSearch =

              product.productName
                ?.toLowerCase()

                .includes(
                  search.toLowerCase()
                );

            if (
              !userLocation ||
              !product.location
            ) {

              return matchesSearch;
            }

            const distance =

              calculateDistance(

                userLocation.latitude,

                userLocation.longitude,

                Number(
                  product.location
                    ?.latitude
                ),

                Number(
                  product.location
                    ?.longitude
                )
              );

            return (

              matchesSearch &&

              distance <=
                product.deliveryRadius
            );
          }
        )

      : [];

  return (

    <div>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-100 min-h-[60vh] flex items-center justify-center">

        <div className="text-center px-4">

          <h1 className="text-6xl font-bold text-green-700 mb-5">
            Fresh Organic Foods
          </h1>

          <p className="text-xl text-gray-700">
            Directly From Farmers
          </p>

        </div>

      </section>

      {/* Products */}
      <section className="p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">

          Nearby Organic Products

        </h1>

        {/* Search */}
        <div className="flex justify-center mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border p-3 rounded-xl w-full md:w-[40%]"
          />

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {filteredProducts.length >
          0 ? (

            filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )

          ) : (

            <div className="col-span-3 text-center text-gray-500 text-xl">

              No Products Found

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default Home;