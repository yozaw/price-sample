import React from "react";
import "../styles.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FeatureData from "../FeatureData.json";

export const SubFeatures = (props) => {
  const { subFeatureTotalPrice, featureValues, valueChange, valueBlur } = props;

  return (
    <>
      {FeatureData.mainFeature.map((mainFeature, mainFeatureIndex) => {
        return (
          <Accordion key={mainFeatureIndex}>
            <AccordionSummary
              key={mainFeatureIndex}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid
                key={mainFeatureIndex}
                container
                spacing={3}
                alignItems="center"
              >
                <Grid key={"grid1" + mainFeatureIndex} item xs={12} sm={6}>
                  <Typography key={mainFeatureIndex} className="main-feature">
                    {mainFeature.title}
                  </Typography>
                </Grid>
                <Grid
                  key={"grid2" + mainFeatureIndex}
                  item
                  xs={12}
                  sm={3}
                ></Grid>
                <Grid
                  key={"grid3" + mainFeatureIndex}
                  item
                  xs={12}
                  sm={3}
                  className="sub-feature-price"
                >
                  {subFeatureTotalPrice(mainFeatureIndex)}
                </Grid>
                <Grid
                  key={"grid4" + mainFeatureIndex}
                  item
                  xs={12}
                  sm={9}
                  className="main-feature-description"
                >
                  <Typography
                    key={mainFeatureIndex}
                    dangerouslySetInnerHTML={{
                      __html:
                        FeatureData.mainFeature[mainFeatureIndex].descriptions
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            {featureValues[mainFeatureIndex].map(
              (subFeatureValue, subFeatureIndex) => {
                return (
                  <AccordionDetails key={subFeatureIndex}>
                    <Grid
                      key={subFeatureIndex}
                      container
                      spacing={3}
                      alignItems="center"
                    >
                      <Grid
                        key={"grid1" + subFeatureIndex}
                        item
                        xs={12}
                        className="sub-feature"
                      >
                        {
                          FeatureData.mainFeature[mainFeatureIndex].subFeature[
                            subFeatureIndex
                          ].title
                        }
                      </Grid>
                      <Grid key={"grid2" + subFeatureIndex} item xs={12} sm={9}>
                        <Slider
                          key={subFeatureIndex}
                          max={
                            FeatureData.mainFeature[mainFeatureIndex]
                              .subFeature[subFeatureIndex].maxValue
                          }
                          step={
                            FeatureData.mainFeature[mainFeatureIndex]
                              .subFeature[subFeatureIndex].stepValue
                          }
                          value={subFeatureValue}
                          onChange={(event, subFeatureValue) =>
                            valueChange(
                              subFeatureValue,
                              mainFeatureIndex,
                              subFeatureIndex
                            )
                          }
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                      <Grid key={"grid3" + subFeatureIndex} item xs={12} sm={1}>
                        <Input
                          key={subFeatureIndex}
                          value={subFeatureValue}
                          type="number"
                          margin="dense"
                          onChange={(event) =>
                            valueChange(
                              event.target.value,
                              mainFeatureIndex,
                              subFeatureIndex
                            )
                          }
                          onBlur={(event) =>
                            valueBlur(event, subFeatureIndex, mainFeatureIndex)
                          }
                          inputProps={{
                            step:
                              FeatureData.mainFeature[mainFeatureIndex]
                                .subFeature[subFeatureIndex].stepValue,
                            min: 0,
                            max:
                              FeatureData.mainFeature[mainFeatureIndex]
                                .subFeature[subFeatureIndex].maxValue,
                            type: "number",
                            "aria-labelledby": "input-slider"
                          }}
                        />
                      </Grid>
                      <Grid
                        key={"grid4" + subFeatureIndex}
                        item
                        xs={12}
                        sm={2}
                        className="sub-feature-unit"
                      >
                        {
                          FeatureData.mainFeature[mainFeatureIndex].subFeature[
                            subFeatureIndex
                          ].unit
                        }
                      </Grid>
                      <Grid
                        key={"grid5" + subFeatureIndex}
                        item
                        xs={12}
                        className="feature-price-description"
                      >
                        {
                          FeatureData.mainFeature[mainFeatureIndex].subFeature[
                            subFeatureIndex
                          ].priceDescriptions
                        }
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                );
              }
            )}
          </Accordion>
        );
      })}
    </>
  );
};
