'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { 
    Card, 
    CardHeader, 
    Grid,
    IconButton,
    Button,
    Container,
    Typography
} from '@mui/material';

//import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Collectibles } from '@/components/models/models';
import butterfly_gator from "./../images/butterfly_gator.png"
import depot_gator from "./../images/depot_gator.png";
import germaines_gator from "./../images/germaines_gator.png"
import karmacream_gator from "./../images/karmacream_gator.png"
import marston_gator from "./../images/marston_gator.png"
import culture_gator from "./../images/culture_gator.png"
import nature_gator from "./../images/nature_gator.png"
import { AlignVerticalCenter } from '@mui/icons-material';
//import { StaticImageData } from 'next/image';

export default function CollectiblePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [data, setData] = useState<Collectibles | null>(null);
    const user = useUser(); 
    const userId = user.user?.id
    console.log(userId);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5050/api/users/${userId}`);
            const json = await response.json();
            console.log("json: ", json);

            if (userId) {
              setData(json);
            } else {
              setData(null);
            }
            //console.log("inner data: ", data)
      
          } catch (error) {
            console.error(error);
          }
        };

        if (userId) {
            fetchData();
            //console.log("data: ", data);
        }
      
      }, []);

      // useEffect(() => {
      //   console.log("Updated data: ", data);
      // }, [data]);
   
    return (
        <Container maxWidth="lg" sx={{
            paddingTop: "20px"
          }}>
            <Grid container direction="row" sx={{
              display: "flex",
              justifyContent: "space-between"
            }}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h2" gutterBottom paddingBottom="0px" marginBottom="0px">
                Your Collectibles
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom color='gray' padding="10px" paddingLeft="0px" fontWeight="5">
                These are the gators you've earned so far!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
        <Grid container spacing={2}>
            
            {data?.counters.art !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={culture_gator.src}
                  alt="Culture Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.counters.art >= 3 ? 1 : 0.3,
                    filter: data.counters.art >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.counters.art < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.counters.art) +" more culture locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"culture locations: " +  data.counters.art}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}
            {data?.counters.nature !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={nature_gator.src}
                  alt="Nature Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.counters.nature >= 3 ? 1 : 0.3,
                    filter: data.counters.nature >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.counters.nature < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.counters.nature) +" more nature locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"nature locations: " +  data.counters.nature}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}

            {data?.counters.uf !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={marston_gator.src}
                  alt="Marston Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.counters.uf >= 3 ? 1 : 0.3,
                    filter: data.counters.uf >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.counters.uf < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.counters.uf) +" more UF locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"UF locations: " +  data.counters.uf}</Typography>
                  </Grid>}
              </Grid>
              </Grid>
            )}
            {data?.counters.restaurant !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={germaines_gator.src}
                  alt="Germaines Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.counters.restaurant >= 3 ? 1 : 0.3,
                    filter: data.counters.restaurant >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.counters.restaurant < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.counters.restaurant) +" more restaurant locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"restaurant locations: " +  data.counters.restaurant}</Typography>
                  </Grid>}
              </Grid>
              </Grid>
            )}
            
            {data?.counters.cafe !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={karmacream_gator.src}
                  alt="Cafe Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.counters.cafe >= 3 ? 1 : 0.3,
                    filter: data.counters.cafe >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.counters.cafe < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.counters.cafe) +" more cafe locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"cafe locations: " +  data.counters.cafe}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}

            {data?.booleans.germaines !== undefined && (
            <Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={germaines_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.booleans.germaines === true ? 1: 0.3,
                  filter: data.booleans.germaines === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                  <Typography variant="body2">{"germaine's!!"}</Typography>
                </Grid>
            </Grid>
            )}

            {data?.booleans.depotPark !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={depot_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.booleans.depotPark === true ? 1: 0.3,
                  filter: data.booleans.depotPark === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"depot park!!"}</Typography>
                </Grid>
            </Grid>)}

            {data?.booleans.karmaCream !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={karmacream_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.booleans.karmaCream === true ? 1: 0.3,
                  filter: data.booleans.karmaCream === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"karma cream!!"}</Typography>
                </Grid>
            </Grid>)}
            
            {data?.booleans.butterflyGarden !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={butterfly_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.booleans.butterflyGarden === true ? 1: 0.3,
                  filter: data.booleans.butterflyGarden === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"butterfly garden!! "}</Typography>
                </Grid>
            </Grid>)}

            {data?.booleans.marston !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={marston_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.booleans.marston === true ? 1: 0.3,
                  filter: data.booleans.marston === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"marston!!"}</Typography>
                </Grid>
            </Grid>)}
              
        </Grid>
        </Grid>
        
        </Grid>
        </Container>
            
    );
}
