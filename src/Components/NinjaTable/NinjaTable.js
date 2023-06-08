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
                  backgroundColor: { value: '{colors.white.20}' },
                  color: { value: '{colors.white.20}' },
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
        
        if(window.confirm("Are you sure?")) {
          const newNinjas = ninjas.filter((ninja) => ninja.belt !== belt);
          setNinjas(newNinjas);
          await API.graphql({
              query: deleteNinjaMutation,
              variables: { input: { belt } },
          });
        }
        }

        const sortByDojo = async(dojo) => {
          let checkbox = document.getElementById(dojo);
          onlyOne(checkbox)
            if ( checkbox.checked ) {
              const apiData = await API.graphql({ query: listNinjas});
              const ninjasFromAPI = apiData.data.listNinjas.items;
              const newNinjas = ninjasFromAPI.filter((ninja) => ninja.dojo === dojo);
              setNinjas(newNinjas);
            }
        }

        async function onlyOne(checkbox) {
          
          let checkboxes = document.getElementsByName('check')
          checkboxes.forEach((item) => {
              if (item !== checkbox) item.checked = false
          })
      }

    return (
  <div>
    <input type="checkbox" id="Aventura" name="check" onClick={() => sortByDojo("Aventura")}></input>
    <label for="aventura">Aventura</label>

    <input type="checkbox" id="Boynton Beach" name="check" onClick={() => sortByDojo("Boynton Beach")}></input>
    <label for="boynton">Boynton Beach</label>

    <input type="checkbox" id="Cooper City" name="check" onClick={() => sortByDojo("Cooper City")}></input>
    <label for="Cooper City">Cooper City</label>

    <input type="checkbox" id="Lake Mary" name="check" onClick={() => sortByDojo("Lake Mary")}></input>
    <label for="lakemary">Lake Mary</label>

    <input type="checkbox" id="Plantation" name="check" onClick={() => sortByDojo("Plantation")}></input>
    <label for="plantation">Plantation</label>

    <ThemeProvider theme={theme}>
    <Table
        highlightOnHover={true}
        variation="striped"
        as="table"
        className="sortable"
      >
        <TableHead as="thead" backgroundColor="lightblue">
          <TableRow>
            <TableCell as="th">Ninja Name</TableCell>
            <TableCell as="th">Dojo</TableCell>
            <TableCell as="th">Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody backgroundColor="rgb(180,200,255)">
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