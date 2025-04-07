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

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Collectibles } from '@/components/models/models';
import butterfly_gator from "./../images/butterfly_gator.png"
import depot_gator from "./../images/depot_gator.png";
import germaines_gator from "./../images/germaines_gator.png"
import karmacream_gator from "./../images/karmacream_gator.png"
import marston_gator from "./../images/marston_gator.png"
import { StaticImageData } from 'next/image';

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
            console.log(json);
            setData(json);
      
          } catch (error) {
            console.error(error);
          }
        };

        if (userId) {
            fetchData();
            console.log("data: ", data);
        }
      
      }, []);
   
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
            {data?.artCounter && data?.artCounter > 0 ? <Grid item>
                <img ></img>
            </Grid> : null}
            {data?.natureCounter && data?.natureCounter > 0 ? <Grid item>
                <img ></img>
            </Grid> : null}
            {data?.ufCounter && data?.ufCounter > 0 ? <Grid item>
                <img ></img>
            </Grid> : null}
            {data?.restaurantCounter && data?.restaurantCounter > 0 ? <Grid item>
                <img ></img>
            </Grid> : null}
            {data?.cafeCounter && data?.cafeCounter > 0 ? <Grid item>
                <img ></img>
            </Grid> : null}
            {data?.germainesBool && data?.germainesBool === true ? <Grid item>
                <img src="./../images/germaines_gator.png"></img>
            </Grid> : null}
            {data?.depotParkBool && data?.depotParkBool === true ? <Grid item>
                <img src="./../images/depot_gator.png"></img>
            </Grid> : null}
            {data?.karmaCreamBool && data?.karmaCreamBool === true ? <Grid item>
                <img src="./../images/karmacream_gator.png"></img>
            </Grid> : null}
            {data?.butterflyGardenBool && data?.butterflyGardenBool === true ? <Grid item>
                <img src="./../images/butterfly_gator.png"></img>
            </Grid> : null}
            {data?.marstonBool && data?.marstonBool === true ? <Grid item>
                <img src="./../images/marston_gator.png"></img>
            </Grid> : null}
       
        </Grid>
        </Grid>
        
        </Grid>
        </Container>
            
    );
}
