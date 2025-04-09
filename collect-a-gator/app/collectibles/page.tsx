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
            
            {data?.artCounter !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={culture_gator.src}
                  alt="Culture Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.artCounter >= 3 ? 1 : 0.3,
                    filter: data.artCounter >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.artCounter < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.artCounter) +" more culture locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"culture locations: " +  data.artCounter}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}
            {data?.natureCounter !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={nature_gator.src}
                  alt="Nature Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.natureCounter >= 3 ? 1 : 0.3,
                    filter: data.natureCounter >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.natureCounter < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.natureCounter) +" more nature locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"nature locations: " +  data.natureCounter}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}

            {data?.ufCounter !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={marston_gator.src}
                  alt="Marston Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.ufCounter >= 3 ? 1 : 0.3,
                    filter: data.ufCounter >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.ufCounter < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.ufCounter) +" more UF locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"UF locations: " +  data.ufCounter}</Typography>
                  </Grid>}
              </Grid>
              </Grid>
            )}
            {data?.restaurantCounter !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={germaines_gator.src}
                  alt="Germaines Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.restaurantCounter >= 3 ? 1 : 0.3,
                    filter: data.restaurantCounter >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.restaurantCounter < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.restaurantCounter) +" more restaurant locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"restaurant locations: " +  data.restaurantCounter}</Typography>
                  </Grid>}
              </Grid>
              </Grid>
            )}
            
            {data?.cafeCounter !== undefined && (
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                <img
                  src={karmacream_gator.src}
                  alt="Cafe Gator"
                  width={100}
                  height={135}
                  style={{
                    opacity: data.cafeCounter >= 3 ? 1 : 0.3,
                    filter: data.cafeCounter >= 3 ? 'none' : 'grayscale(100%)',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                />
                {data?.cafeCounter < 3 ? 
                  <Grid container direction="column">
                    <Typography variant="body2">{"visit " + (3 - data.cafeCounter) +" more cafe locations"}</Typography>
                  </Grid> :   
                  <Grid container direction="column">
                    <Typography variant="body2">{"cafe locations: " +  data.cafeCounter}</Typography>
                  </Grid>}
                  </Grid>
              </Grid>
            )}

            {data?.germainesBool !== undefined && (
            <Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={germaines_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.germainesBool === true ? 1: 0.3,
                  filter: data.germainesBool === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                  <Typography variant="body2">{"germaine's!!"}</Typography>
                </Grid>
            </Grid>
            )}

            {data?.depotParkBool !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={depot_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.depotParkBool === true ? 1: 0.3,
                  filter: data.depotParkBool === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"depot park!!"}</Typography>
                </Grid>
            </Grid>)}

            {data?.karmaCreamBool !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={karmacream_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.karmaCreamBool === true ? 1: 0.3,
                  filter: data.karmaCreamBool === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"karma cream!!"}</Typography>
                </Grid>
            </Grid>)}
            
            {data?.butterflyGardenBool !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={butterfly_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.butterflyGardenBool === true ? 1: 0.3,
                  filter: data.butterflyGardenBool === true ? 'none' : 'grayscale(100%)',
                  alignItems: 'center',
                  justifyItems: 'center'
                 }}
              />
                    <Typography variant="body2">{"butterfly garden!! "}</Typography>
                </Grid>
            </Grid>)}

            {data?.marstonBool !== undefined && (<Grid item>
              <Grid container direction="column" alignItems="center" justifyContent="center">
              <img
                src={marston_gator.src}
                alt="Marker Gator"
                width={100}
                height={135}
                style={{ 
                  opacity: data.marstonBool === true ? 1: 0.3,
                  filter: data.marstonBool === true ? 'none' : 'grayscale(100%)',
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
