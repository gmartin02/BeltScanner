import React, { useState, useEffect } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';
//import Welcome from '../Welcome/Welcome'
import { API } from "aws-amplify";
import { listNinjas, getNinja } from '../../graphql/queries';
import {
    createNinja as createNinjaMutation,
    deleteNinja as deleteNinjaMutation,
  } from "../../graphql/mutations";

  import {
    Flex,
    Button,
    Text,
    View,
    TextField
  } from "@aws-amplify/ui-react";

function Scanner () {
    const [ninjas, setNinjas] = useState([]);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");




    useEffect(() => {
        fetchNinjas();
    }, []);

    async function fetchNinjas() {
        const apiData = await API.graphql({ query: listNinjas });
        const ninjasFromAPI = apiData.data.listNinjas.items;
        setNinjas(ninjasFromAPI);
        console.log(ninjas)
    }

    async function oneNinja({Sbelt}) {
        let ninja = await API.graphql({
            query: getNinja,
            variables: { belt: Sbelt }
        });
        setSearch(ninja)
        console.log(ninja)
    }

    async function createNinja(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
          name: form.get("name"),
          belt: form.get("belt"),
        };
        await API.graphql({
          query: createNinjaMutation,
          variables: { input: data },
        });
        fetchNinjas();
        event.target.reset();
      }
    
      async function deleteNinja({ belt }) {
        const newNinjas = ninjas.filter((ninja) => ninja.belt !== belt);
        setNinjas(newNinjas);
        await API.graphql({
          query: deleteNinjaMutation,
          variables: { input: { belt } },
        });
      }

    const delay = (duration) =>
        new Promise(resolve => setTimeout(resolve, duration));

    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log(message)
    };

    const scanNFC = async () => {
        document.getElementById("text").innerHTML = "Scanning...";
        delay(3000);
        //let currentBelt = document.getElementById("id").value;
        oneNinja("12")
        console.log(search)
    }   

    return (
        <div className='container'>
            <img src={whiteBelt} className="ninjaHead" alt=''/>
            <button onClick={scanNFC} className='startScan'></button>
            <p className='text' id="text">Scan your belt Ninja!</p>
            <input id="input" className='name' type='text' autoFocus onChange={handleChange}></input>
            
            
            <View as="form" margin="3rem 0" onSubmit={createNinja}>
                <Flex direction="row" justifyContent="center">
                    <TextField
                        name="name"
                        placeholder="Ninja Name"
                        label="Ninja Name"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <TextField
                        name="belt"
                        placeholder="Ninja Belt"
                        label="Ninja Belt"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <Button type="submit" variation="primary">
                        Create Ninja
                    </Button>
                </Flex>
            </View>

            <View margin="3rem 0">
                {ninjas.map((ninja) => (
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
                    <Button variation="link" onClick={() => deleteNinja(ninja)}>
                        Delete ninja
                    </Button>
                </Flex>
                ))}
            </View>
        </div>
    );
}

export default Scanner;