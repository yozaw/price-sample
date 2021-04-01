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

export const App = () => {
  const priceDescriptions = [
    <li>
      Access ArcGIS Platform location services with your free developer
      subscription.
    </li>,
    <li>
      Estimate your costs for location services with the pricing calculator.
    </li>,
    <li>
      Free tiers of basemaps, geocodes, and other services are included in
      estimated cost.
    </li>,
    <li>
      <a
        href="https://www.esri.com/en-us/contact"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact us for high volume pricing
      </a>
      .
    </li>
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
    <>
      Add location to your application with{" "}
      <a
        href="https://developers.arcgis.com/features/maps-and-data/"
        target="_blank"
        rel="noopener noreferrer"
      >
        basemap layers
      </a>
      , such as streets, satellite imagery, and others. Usage is billed per tile
      request.
    </>,
    <>
      <a
        href="https://developers.arcgis.com/features/geocoding/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search and find
      </a>{" "}
      addresses, businesses, and points of interest around the world.
    </>,
    <>
      Find the quickest or shortest route based on time and distance, generate
      turn-by-turn directions, and perform intelligent network analysis with
      ready-to-use{" "}
      <a
        href="https://developers.arcgis.com/features/directions/"
        target="_blank"
        rel="noopener noreferrer"
      >
        routing and directions services
      </a>
      .
    </>,
    <>
      <a
        href="https://developers.arcgis.com/features/demographics/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get facts
      </a>{" "}
      about the people, places, and businesses in a specific location. Join your
      existing datasets with Esri's extensive portfolio of global location data
      that is easily accessible for data enrichment.
    </>,
    <>
      Publish tiles from your{" "}
      <a
        href="https://developers.arcgis.com/features/hosted-data/"
        target="_blank"
        rel="noopener noreferrer"
      >
        hosted feature layers
      </a>
      .
    </>,
    <>
      Securely{" "}
      <a
        href="https://developers.arcgis.com/features/hosted-data/"
        target="_blank"
        rel="noopener noreferrer"
      >
        store and host your data
      </a>{" "}
      in the cloud.
    </>
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

  const subFeatureRates = [
    [0],
    [0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0],
    [0],
    [0, 0]
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
    //ここは上限値が異なるので書き換える
    if (event.target.value < 0) {
      setSubFeatureValues(0);
    } else if (event.target.value > 100) {
      setSubFeatureValues(100);
    }
  };

  const subFeatureTotalPrice = (mainFeatureIndex) => {
    const subFeatureData = subFeatureValues[mainFeatureIndex];
    const subFeatureTotalPrice = subFeatureData.reduce(function (a, x) {
      return a + x;
    }, 0);
    if (subFeatureTotalPrice === 0) {
      return "Not Selected";
    } else {
      return subFeatureTotalPrice + " total approx";
    }
  };

  const featureTotalPrice = () => {
    const subFeatureData = subFeatureValues;
    let featureTotalPrice = 0;
    for (var i in subFeatureData) {
      const subFeatureTodalPrice = subFeatureData[i].reduce(function (a, x) {
        return a + x;
      }, 0);
      featureTotalPrice = featureTotalPrice + subFeatureTodalPrice;
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
              {priceDescriptions.map((priceDescription) => {
                return priceDescription;
              })}
            </ul>
          </Grid>
          <Grid item xs={12} sm={3} className="total-price">
            Rete: $1= \
            <input
              className="rate-input"
              placeholder="Rate"
              value={rateText}
              onChange={onCangeRateText}
            />{" "}
            <br />$ {featureTotalPrice()} / month
            <br />\ {featureTotalPriceJp()} / month
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
                    {mainFeatureDescriptions[mainFeatureIndex]}
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
                                step: 1,
                                min: 0,
                                max: 100,
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
