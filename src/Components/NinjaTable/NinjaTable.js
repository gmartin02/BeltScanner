import React, { useState, useEffect, useRef } from 'react'
import { API, Auth } from "aws-amplify";
//import Welcome from '../Welcome/Welcome'
import { listNinjas, getNinja } from '../../graphql/queries';
import {
    Flex,
    Button,
    Text,
    View,
    TextField
  } from "@aws-amplify/ui-react";

function NinjaTable () {
    const [ninjas, setNinjas] = useState([]);

    useEffect(() => {
        fetchNinjas();
    }, []);

    async function fetchNinjas() {
        const apiData = await API.graphql({ query: listNinjas});
        const ninjasFromAPI = apiData.data.listNinjas.items;
        setNinjas(ninjasFromAPI);
        }

    return (
        <div>
            {ninjas.map((ninja) =>             
                <Flex
                    key={ninja.belt || ninja.name}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text as="strong" fontWeight={700}>
                        {ninja.name}
                    </Text>
                    <Text as="span">{ninja.belt}</Text>
                    <Text as="span">{ninja.owner}</Text>
                </Flex>
                )}
        </div>
        
    );
}

export default NinjaTable;