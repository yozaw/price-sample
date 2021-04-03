import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./styles.css";
import { AddAPhoto } from "@material-ui/icons";

export const App = () => {
  const priceDescriptions = [
    "Access ArcGIS Platform location services with your free developer subscription.",
    "Estimate your costs for location services with the pricing calculator.",
    "Free tiers of basemaps, geocodes, and other services are included in estimated cost.",
    "<a href='https://www.esri.com/en-us/contact' target='_blank' rel='noopener noreferrer'>Contact us for high volume pricing</a>."
  ];

  const mainFeatureLists = [
    "Basemap layers",
    "Geocode and search",
    "Route and directions",
    "Demographic data",
    "Tile generation",
    "Storage"
  ];

  const mainFeatureDescriptions = [
    "Add location to your application with <a href='https://developers.arcgis.com/features/maps-and-data/' target='_blank' rel='noopener noreferrer'>basemap layers</a>, such as streets, satellite imagery, and others. Usage is billed per tile request.",
    "<a href='https://developers.arcgis.com/features/geocoding/' target='_blank' rel='noopener noreferrer'>Search and find</a> addresses, businesses, and points of interest around the world.",
    "Find the quickest or shortest route based on time and distance, generate turn-by-turn directions, and perform intelligent network analysis with ready-to-use <a href='https://developers.arcgis.com/features/directions/' target='_blank' rel='noopener noreferrer'> routing and directions services</a>.",
    "<a href='https://developers.arcgis.com/features/demographics/' target='_blank' rel='noopener noreferrer'>Get facts</a> about the people, places, and businesses in a specific location. Join your existing datasets with Esri's extensive portfolio of global location data that is easily accessible for data enrichment.",
    "Publish tiles from your <a href='https://developers.arcgis.com/features/hosted-data/' target='_blank' rel='noopener noreferrer'>hosted feature layers</a>.",
    "Securely <a href='https://developers.arcgis.com/features/hosted-data/' target='_blank' rel='noopener noreferrer'>store and host your data</a>in the cloud."
  ];

  const subFeatureLists = [
    ["Basemaps"],
    ["Geocode (non-stored)", "Geocode (stored)"],
    [
      "Simple Routes",
      "Optimized Routes",
      "Drive Time (service area)",
      "Multi-Vehicle Routes",
      "Closest Facilities",
      "Location Allocation",
      "OD Matrix"
    ],
    ["Geographic Data Enrichment (enrich)", "Demographic Reports (export)"],
    ["Map Tile Generation"],
    [
      "Tile and Data Storage (map tiles, feature attachments, scene layer packages, and documents)",
      "Feature Service Storage (import and create, excludes feature attachments)"
    ]
  ];

  const subFeatureUnits = [
    ["Tile"],
    ["Geocode", "Geocode"],
    [
      "Route",
      "Route",
      "Service Area",
      "Route",
      "Route",
      "Demand Point",
      "Origin Destination Pair"
    ],
    ["Variable", "Export"],
    ["Tile"],
    ["GB", "MB"]
  ];

  const subFeaturePriceDescriptions = [
    ["2,000,000 free then $0.15 per 1,000 Tiles"],
    [
      "20,000 free then $0.5 per 1,000 Geocodes",
      "0 free then $4 per 1,000 Geocodes"
    ],
    [
      "20,000 free then $0.5 per 1,000 Routes",
      "0 free then $50 per 1,000 Routes",
      "5,000 free then $50 per 1,000 Service Areas",
      "0 free then $100 per 1,000 Routes",
      "0 free then $50 per 1,000 Routes",
      "0 free then $10 per 1,000 allocated Demand Points",
      "0 free then $0.05 per 1,000 input Origin Destination Pairs"
    ],
    ["0 free then $1 per 1,000 Variables", "0 free then $1 each"],
    ["0 free then $0.1 per 1,000 Tiles"],
    ["5 free then $0.12 per GB", "100 free then $2.40 per 100 MBs"]
  ];

  const [subFeatureValues, setSubFeatureValues] = useState([
    [0],
    [0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0],
    [0],
    [0, 0]
  ]);

  const subFeatureMaxValues = [
    [15000000],
    [4000000, 1000000],
    [4000000, 1000000, 4000000, 999999, 999999, 999999, 4000000],
    [999999, 1000],
    [999999],
    [100, 1000000]
  ];

  const subFeatureStepValues = [
    [1000],
    [1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 10],
    [1000],
    [5, 10]
  ];

  const subFeaturePrices = [
    [0.00015],
    [0.0005, 0.004],
    [0.0005, 0.05, 0.05, 0.1, 0.05, 0.01, 0.00005],
    [0.001, 1],
    [0.0001],
    [0.12, 0.024]
  ];

  const subFeatureFreeValues = [
    [2000000],
    [20000, 0],
    [20000, 0, 5000, 0, 0, 0, 0],
    [0, 0],
    [0],
    [5, 100]
  ];

  const [rateText, setRateText] = useState("100");
  const onCangeRateText = (event) => setRateText(event.target.value);

  const handleSliderChange = (
    subFeatureIndex,
    subFeatureValue,
    mainFeatureIndex
  ) => {
    setSubFeatureValues((previousState) => {
      const newSubFeatureValues = [...previousState];
      newSubFeatureValues[mainFeatureIndex][subFeatureIndex] = subFeatureValue;
      return newSubFeatureValues;
    });
  };

  const handleInputChange = (event, subFeatureIndex, mainFeatureIndex) => {
    setSubFeatureValues((previousState) => {
      const newSubFeatureValues = [...previousState];
      newSubFeatureValues[mainFeatureIndex][subFeatureIndex] =
        event.target.value === "" ? "" : Number(event.target.value);
      return newSubFeatureValues;
    });
  };

  const handleBlur = (event, subFeatureIndex, mainFeatureIndex) => {
    if (event.target.value < 0) {
      setSubFeatureValues(0);
    } else if (event.target.value > subFeatureMaxValues[mainFeatureIndex][subFeatureIndex]) {
      setSubFeatureValues(subFeatureMaxValues[mainFeatureIndex][subFeatureIndex]);
    }
  };

  const subFeatureTotalPrice = (mainFeatureIndex) => {
    let freeFlag = false;
    const subFeatureData = subFeatureValues[mainFeatureIndex];
    let subFeatureTotalPrice = 0;
    for (const i in subFeatureData) {
      const freeValues = subFeatureFreeValues[mainFeatureIndex][i];
      if (subFeatureData[i] >= freeValues) {
        subFeatureTotalPrice = subFeatureTotalPrice + subFeatureData[i] * subFeaturePrices[mainFeatureIndex][i]
      } 
      if (subFeatureData[i] > 0) {
        freeFlag = true;
      }
    }

    // "Not Selected";

    if (subFeatureTotalPrice === 0 && freeFlag) {
      return "Free";
    } else if (subFeatureTotalPrice === 0 && !freeFlag) {
      return "Not Selected";
    } else {
      return `$ ${subFeatureTotalPrice} total approx`;
    }
  };

  const featureTotalPrice = () => {

   let featureTotalPrice = 0;
   for (const i in subFeatureValues) {
    for (const s in subFeatureValues[i]) {
      
      featureTotalPrice = featureTotalPrice + subFeatureValues[i][s] * subFeaturePrices[i][s]
    }
   }
    return featureTotalPrice;
  };

  const featureTotalPriceJp = () => {
    return Number(rateText) * featureTotalPrice();
  };

  return (
    <>
      <div className="main-area">
        <p className="main-title">Location services pricing</p>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={8}>
            <ul>
              {priceDescriptions.map((priceDescription) => (
                <li dangerouslySetInnerHTML={{ __html: priceDescription }} />
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={3} className="total-price">
            Rete: $1= &yen;
            <input
              className="rate-input"
              placeholder="Rate"
              value={rateText}
              onChange={onCangeRateText}
            />{" "}
            <br />$ {featureTotalPrice()} / month
            <br />&yen; {featureTotalPriceJp()} / month
          </Grid>
        </Grid>
      </div>
      <div className="service-area">
        <p className="service-title">Services</p>
        {mainFeatureLists.map((mainFeature, mainFeatureIndex) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography className="main-feature">
                      {mainFeature}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={7}></Grid>
                  <Grid item xs={12} sm={2} className="sub-feature-price">
                    {subFeatureTotalPrice(mainFeatureIndex)}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    className="main-feature-description"
                  >
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: mainFeatureDescriptions[mainFeatureIndex]
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionSummary>
              {subFeatureValues[mainFeatureIndex].map(
                (subFeature, subFeatureIndex) => {
                  return (
                    <>
                      <AccordionDetails>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} className="sub-feature">
                            {subFeatureLists[mainFeatureIndex][subFeatureIndex]}
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Slider
                              max={
                                subFeatureMaxValues[mainFeatureIndex][
                                  subFeatureIndex
                                ]
                              }
                              step={
                                subFeatureStepValues[mainFeatureIndex][
                                  subFeatureIndex
                                ]
                              }
                              value={subFeature}
                              onChange={(event, subFeatureValue) =>
                                handleSliderChange(
                                  subFeatureIndex,
                                  subFeatureValue,
                                  mainFeatureIndex
                                )
                              }
                              aria-labelledby="input-slider"
                            />
                          </Grid>
                          <Grid item xs={12} sm={1}>
                            <Input
                              value={subFeature}
                              margin="dense"
                              onChange={(event) =>
                                handleInputChange(
                                  event,
                                  subFeatureIndex,
                                  mainFeatureIndex
                                )
                              }
                              onBlur={(event) =>
                                handleBlur(
                                  event,
                                  subFeatureIndex,
                                  mainFeatureIndex
                                )
                              }
                              inputProps={{
                                step:
                                  subFeatureStepValues[mainFeatureIndex][
                                    subFeatureIndex
                                  ],
                                min: 0,
                                max:
                                  subFeatureMaxValues[mainFeatureIndex][
                                    subFeatureIndex
                                  ],
                                type: "number",
                                "aria-labelledby": "input-slider"
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            className="sub-feature-unit"
                          >
                            {subFeatureUnits[mainFeatureIndex][subFeatureIndex]}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className="feature-price-description"
                          >
                            {
                              subFeaturePriceDescriptions[mainFeatureIndex][
                                subFeatureIndex
                              ]
                            }
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </>
                  );
                }
              )}
            </Accordion>
          );
        })}
      </div>
    </>
  );
};
