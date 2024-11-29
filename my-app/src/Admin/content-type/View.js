import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    View,
    Heading,
    Flex,
    useTheme,
    Badge,
    Text,
    Divider,
    Button,
} from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { useList } from './store/contentcontext';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CustomSeparator from '../common/Breadcrumbs';

export default function ViewPage() {
  const navigate = useNavigate();
    const { tokens } = useTheme();
    const { list } = useList();
    const location = useLocation();
    const pathAfterView = location.pathname.split('/view/')[1];

    const document = list.find((item) => item._id === pathAfterView);

    return (
      <div className="wrapper">
      <Sidebar />
      <div className="main">
          <Header />
          <main className="content">
          <CustomSeparator/>
        <View
            backgroundColor={tokens.colors.background.primary}
            padding={tokens.space.large}
        >
            <Card
                variation="elevated"
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.large}
                style={{ maxWidth: '600px', margin: '0 auto' }}
            >
                <Flex direction="column" alignItems="stretch" gap={tokens.space.medium}>
                    <Heading level={3} style={{ textAlign: 'center' }}>
                        Document Details
                    </Heading>
                    <Divider />
                    <Flex direction="row" gap={tokens.space.medium}>
                        <Text fontWeight="bold">ID:</Text>
                        <Text>{pathAfterView}</Text>
                    </Flex>
                    <Flex direction="row" gap={tokens.space.medium}>
                        <Text fontWeight="bold">Title:</Text>
                        <Text>{document.title}</Text>
                    </Flex>
                    <Flex direction="row" gap={tokens.space.medium}>
                        <Text fontWeight="bold">Description:</Text>
                        <Text>{document.description}</Text>
                    </Flex>
                    <Flex direction="row" gap={tokens.space.medium} alignItems="center">
                        <Text fontWeight="bold">Status:</Text>
                        <Badge
                            size="small"
                            variation={document.status ? 'success' : 'error'}
                        >
                            {document.status ? 'Active' : 'Inactive'}
                        </Badge>
                    </Flex>
                    <Divider />
                    {/* <Flex justifyContent="center" gap={tokens.space.medium}>
                        <Button variation="primary" onClick={() =>
                                                navigate(`/admin/content-type/update/${document._id}`)
                                            }>UPDATE</Button>
                        <Button variation="link">DELETE</Button>
                    </Flex> */}
                </Flex>
            </Card>
        </View>
        </main>
                <Footer />
            </div>
        </div>
        
    );
}
