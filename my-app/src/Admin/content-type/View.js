import React, { useEffect, useState } from 'react'
import {
  Card,
  View,
  Heading,
  Flex,
  useTheme,
} from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function ViewPage() {
  const [document, setDocument] = useState({})
  const { tokens } = useTheme();
  const location = useLocation();
  const pathAfterView = location.pathname.split('/view/')[1];

  useEffect(() => {
    const fetchSingleItem = async () => {
      const response = await fetch(`http://localhost:5000/api/content-type/view/${pathAfterView}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data);
        setDocument(data)
      }
    }
    fetchSingleItem();
  }, [])

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin/content-type">
              Content - Type
            </Link>
            <Link underline="hover" color="inherit" href={`/admin/content-type/view/${pathAfterView}`}>
              View
            </Link>
          </Breadcrumbs>
          <View
            backgroundColor={tokens.colors.background.secondary}
            padding={tokens.space.medium}
          >
            <Card variation="elevated">
              <Flex direction="row" alignItems="flex-start">

                <Flex
                  direction="column"
                  alignItems="flex-start"
                  gap={tokens.space.xs}
                >


                  <Heading level={5}>
                    {pathAfterView}
                  </Heading>
                  <Heading level={5}>
                    {document.title}
                  </Heading>
                  <Heading level={5}>
                    {document.description}
                  </Heading>
                  <Heading level={5}>
                    {document.status ? "Active" : "Inactive"}
                  </Heading>


                </Flex>
              </Flex>
            </Card>
          </View>
        </main>
        <Footer />
      </div>
    </div>
  )
}
