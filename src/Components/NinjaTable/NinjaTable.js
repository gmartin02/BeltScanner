import React, { useState, useEffect } from 'react'
import { API, Auth } from "aws-amplify";
//import Welcome from '../Welcome/Welcome'
import { listNinjas } from '../../graphql/queries';
import {
    Flex,
    Button,
    View,
    TextField,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    ThemeProvider
  } from "@aws-amplify/ui-react";

  import {
    createNinja as createNinjaMutation,
    deleteNinja as deleteNinjaMutation,
  } from "../../graphql/mutations";

function NinjaTable () {
    const [ninjas, setNinjas] = useState([]);
    const [owner, setOwner] = useState("")

    const theme = {
        name: 'table-theme',
        tokens: {
          components: {
            table: {
              row: {
                hover: {
                  backgroundColor: { value: '{colors.blue.20}' },
                },
      
                striped: {
                  backgroundColor: { value: '{colors.blue.10}' },
                },
              },
      
              header: {
                color: { value: '{colors.blue.80}' },
                fontSize: { value: '{fontSizes.xl}' },
              },
      
              data: {
                fontWeight: { value: '{fontWeights.semibold}' },
              },
            },
          },
        },
      };
    useEffect(() => {
        fetchNinjas();
    }, []);

    async function fetchNinjas() {
        const apiData = await API.graphql({ query: listNinjas});
        const ninjasFromAPI = apiData.data.listNinjas.items;
        setNinjas(ninjasFromAPI);
        setOwner(await Auth.currentUserInfo());
    }

    async function createNinja(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            name: form.get("name"),
            belt: form.get("belt"),
            dojo: form.get("dojo"),
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

    return (
        <div>

<ThemeProvider theme={theme}>
<Table
    highlightOnHover={true}
    variation="striped"
  >
    <TableHead>
      <TableRow>
        <TableCell as="th">Ninja Name</TableCell>
        <TableCell as="th">Dojo</TableCell>
        <TableCell as="th">Created By</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
        {ninjas.map((ninja) =>             
            <TableRow key={ninja.name}>
                <TableCell>{ninja.name}</TableCell>
                <TableCell>{ninja.dojo}</TableCell>
                <TableCell>{ninja.owner}</TableCell>
                <TableCell textAlign="center" width="15px"> {ninja.owner === owner.username ? 
                <Button variation="link" onClick={() => deleteNinja(ninja)}> X </Button> : console.log(owner.username)}</TableCell>
            </TableRow>
            
        )}
    </TableBody>
  </Table>
  </ThemeProvider>
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
                    <TextField
                        name="dojo"
                        placeholder="Dojo"
                        label="Dojo"
                        labelHidden
                        variation="quiet"
                        required
                    />
                    <Button type="submit" variation="primary">
                        Create Ninja
                    </Button>
                </Flex>
            </View>
        </div>
        
    );
}

export default NinjaTable;