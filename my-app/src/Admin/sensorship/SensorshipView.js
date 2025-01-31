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
import { Button, Stack, Box } from '@mui/material';

export default function SensorshipView() {
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
      <Breadcrumbs aria-label="breadcrumb" className="my-4">
        <Link underline="hover" color="inherit" href="/admin/news/list">
          News
        </Link>
        <Link underline="hover" color="inherit" href={`/admin/news/view/${pathAfterView}`}>
          View
        </Link>
      </Breadcrumbs>

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

        <table style={{ width: "80%", borderCollapse: "collapse" }} border="0" className="mx-auto">
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
            <tr>
              <td style={styles.titleColumn}>Image</td>
              <td style={styles.valueColumn}>
                <img
                  src={document.imageUrl || "https://picsum.photos/100"}
                  alt="News"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Box mt={4} display="flex" justifyContent="center">
          <Stack direction="row" spacing={2} sx={{ width: "100%", maxWidth: "500px" }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              // onClick={onApprove}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              // onClick={onReject}
            >
              Reject
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  );
}

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
