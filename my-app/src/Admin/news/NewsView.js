import React, { useEffect, useState } from "react";
import {
  Card,
  View,
  Heading,
  useTheme,
} from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function NewsView() {
  const [document, setDocument] = useState({});
  const { tokens } = useTheme();
  const location = useLocation();
  const pathAfterView = location.pathname.split("/view/")[1];

  useEffect(() => {
    const fetchSingleItem = async () => {
      const response = await fetch(
        `http://localhost:5000/api/news/view/${pathAfterView}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDocument(data);
      }
    };
    fetchSingleItem();
  }, [pathAfterView]);

  return (
    <>
      {/* Breadcrumbs for Navigation */}
      <Breadcrumbs aria-label="breadcrumb" className="my-4">
        <Link underline="hover" color="inherit" href="/admin/news/list">
          News
        </Link>
        <Link underline="hover" color="inherit" href={`/admin/news/view/${pathAfterView}`}>
          View
        </Link>
      </Breadcrumbs>

      {/* Page Content */}
      <Card
        variation="elevated"
        style={{
          padding: "4rem",
          borderRadius: "12px",
          boxShadow: tokens.shadows.large,
          maxWidth: "90%",
          margin: "auto",
        }}
      >
        <Heading level={3} className="text-center mb-4">
          {document.title || "News Details"}
        </Heading>

        {/* Image Section (Option 1: Image Centered with Viewport) */}
        {/* <div className="text-center mb-4">
          <img
            src={document.imageUrl || "https://picsum.photos/200"} // Fallback image if no URL is provided
            alt="News"
            style={{
              maxWidth: "50%", // Small size image
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div> */}

        {/* Table Layout (Option 2: Image Fitting in the Table) */}
        <table style={{ width: "80%", borderCollapse: "collapse"}} border="0" className="mx-auto">
          <tbody>
            <tr>
              <td style={styles.titleColumn}>Type</td>
              <td style={styles.valueColumn}>{document.type || "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.titleColumn} className="text-success">ID</td>
              <td style={styles.valueColumn} className="text-success">{document._id || "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.titleColumn}>Subcategory</td>
              <td style={styles.valueColumn}>{document.subcategory || "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.titleColumn}>Short Description</td>
              <td style={styles.valueColumn}>{document.shortDescription || "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.titleColumn}>Description</td>
              <td style={styles.valueColumn}>{document.description || "No description provided."}</td>
            </tr>
            <tr>
              <td style={styles.titleColumn}>Status</td>
              <td style={styles.valueColumn}>{document.status || "N/A"}</td>
            </tr>

            {/* Optionally add the image inside the table */}
            <tr>
              <td style={styles.titleColumn}>Image</td>
              <td style={styles.valueColumn}>
                <img
                  src={document.imageUrl || "https://picsum.photos/100"}
                  alt="News"
                  style={{
                    maxWidth: "100%", // Image fits the table width
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}

// Inline styles for table columns
const styles = {
  titleColumn: {
    fontWeight: "bold",
    padding: "12px 16px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    width: "30%",
  },
  valueColumn: {
    padding: "12px 16px",
    textAlign: "left",
    border: "1px solid #ddd",
    width: "70%",
    color: "#555",
  },
};
