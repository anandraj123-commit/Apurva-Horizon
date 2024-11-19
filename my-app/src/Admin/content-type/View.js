import React from 'react'
import {
    Card,
    View,
    Heading,
    Flex,
    useTheme,
  } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { useList } from './store/contentcontext';

export default function ViewPage() {
    const { tokens } = useTheme();
    const { list } = useList();
    const location = useLocation();
    const pathAfterView = location.pathname.split('/view/')[1];

    const document = list.find(item => item._id === pathAfterView);
    
    return (
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
                {document.status?"Active":"Inactive"}
              </Heading>
  
              
            </Flex>
          </Flex>
        </Card>
      </View>)
}
