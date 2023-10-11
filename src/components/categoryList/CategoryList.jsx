import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  let data;

  try {
    data = await getData();
  } catch (error) {
    console.error("Error fetching data:", error);
    data = []; // Provide a default empty array if there is an error
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {Array.isArray(data) &&
          data.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`} // Use item.slug to create dynamic links
              className={`${styles.category} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.image}
                />
              )}
              {item.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
