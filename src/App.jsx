import React, { useState } from "react";
import "./styles.css";
import { Helmet } from "react-helmet";

import Grid from "@material-ui/core/Grid";
import FeatureData from "./FeatureData.json";
import { SubFeatures } from "./components/SubFeatures.jsx";

export const App = () => {
  const mainDescriptions = [
    "Access ArcGIS Platform location services with your free developer subscription.",
    "Estimate your costs for location services with the pricing calculator.",
    "Free tiers of basemaps, geocodes, and other services are included in estimated cost.",
    "<a href='https://www.esri.com/en-us/contact' target='_blank' rel='noopener noreferrer'>Contact us for high volume pricing</a>."
  ];

  const [rate, setRate] = useState("100.00");
  const onCangeRate = (event) => setRate(event.target.value);

  const [subFeatureValues, setSubFeatureValues] = useState([
    [0],
    [0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0],
    [0],
    [0, 0]
  ]);

  const featureValueChange = (
    subFeatureValue,
    mainFeatureIndex,
    subFeatureIndex
  ) => {
    setSubFeatureValues((previousState) => {
      const newSubFeatureValues = [...previousState];
      newSubFeatureValues[mainFeatureIndex][subFeatureIndex] = subFeatureValue;
      return newSubFeatureValues;
    });
  };

  const featureValueBlur = (event, subFeatureIndex, mainFeatureIndex) => {
    if (event.target.value < 0) {
      setSubFeatureValues(0);
    } else if (
      event.target.value >
      FeatureData.mainFeature[mainFeatureIndex].subFeature[subFeatureIndex]
        .maxValue
    ) {
      setSubFeatureValues(
        FeatureData.mainFeature[mainFeatureIndex].subFeature[subFeatureIndex]
          .maxValue
      );
    }
  };

  const subFeatureTotalPrice = (mainFeatureIndex) => {
    let freeDisplayFlag = false;
    let maxDisplayFlag = false;
    let subFeatureTotalPrice = 0;

    for (const i in subFeatureValues[mainFeatureIndex]) {
      const freeValue =
        FeatureData.mainFeature[mainFeatureIndex].subFeature[i].freeValue;
      const maxValue =
        FeatureData.mainFeature[mainFeatureIndex].subFeature[i].maxValue;
      if (subFeatureValues[mainFeatureIndex][i] > 0) {
        freeDisplayFlag = true;
        if (subFeatureValues[mainFeatureIndex][i] >= freeValue) {
          subFeatureTotalPrice =
            subFeatureTotalPrice +
            subFeatureValues[mainFeatureIndex][i] *
              FeatureData.mainFeature[mainFeatureIndex].subFeature[i]
                .featurePrice;
          if (subFeatureValues[mainFeatureIndex][i] === maxValue) {
            maxDisplayFlag = true;
          }
        }
      }
    }

    if (subFeatureTotalPrice === 0 && freeDisplayFlag) {
      return "Free";
    } else if (subFeatureTotalPrice === 0 && !freeDisplayFlag) {
      return "Not Selected";
    } else if (maxDisplayFlag) {
      return "Contact Us";
    } else {
      return `$ ${Math.round(subFeatureTotalPrice)} total approx`;
    }
  };

  const featureTotalPrice = () => {
    let featureTotalPrice = 0;
    for (const i in subFeatureValues) {
      for (const s in subFeatureValues[i]) {
        featureTotalPrice =
          featureTotalPrice +
          subFeatureValues[i][s] *
            FeatureData.mainFeature[i].subFeature[s].featurePrice;
      }
    }
    featureTotalPrice = Math.round(featureTotalPrice);
    return featureTotalPrice;
  };

  const featureTotalPriceJp = () => rate * featureTotalPrice();

  return (
    <div className="top">
      <Helmet>
        <title>Pricing</title>
      </Helmet>
      <div className="main-area">
        <p className="main-title">Location services pricing</p>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={7}>
            <ul>
              {mainDescriptions.map((priceDescription, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{ __html: priceDescription }}
                />
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={5} className="total-price">
            Rete: $1= &yen;
            <input
              className="rate-input"
              placeholder="Rate"
              type="number"
              step="0.01"
              value={rate}
              onChange={onCangeRate}
            />{" "}
            <br />$ {featureTotalPrice()} / month
            <br />
            &yen; {featureTotalPriceJp()} / month
          </Grid>
        </Grid>
      </div>
      <div className="service-area">
        <p className="service-title">Services</p>
        <SubFeatures
          subFeatureTotalPrice={subFeatureTotalPrice}
          featureValues={subFeatureValues}
          valueChange={featureValueChange}
          valueBlur={featureValueBlur}
        />
      </div>
    </div>
  );
};
