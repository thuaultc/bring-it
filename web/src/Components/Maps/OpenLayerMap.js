import React from "react";
import {
  layer,
  custom,
  control, //name spaces
  Controls, //group
  Map,
  Layers
} from "react-openlayers";
import { fromLonLat } from "ol/proj";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
// import Vector from "ol/source/Vector";
import { GeoCode } from "geo-coder";

// var iconFeature = new Feature(new Point([0, 0]));
// var source = new Vector({ features: [iconFeature] });
var markers = new custom.style.MarkerStyle(
  "https://openlayers.org/en/v4.0.1/examples/data/icon.png"
);

export default class OpenLayerMap extends React.Component {
  state = {
    center: []
  };

  async componentDidMount() {
    const geoCode = new GeoCode();

    try {
      const res = await geoCode.geolookup(this.props.address);

      console.log(res);

      if (res.length > 0) {
        const { lng, lat } = res[0];

        const [x, y] = fromLonLat([lng, lat]);
        console.log("Map -- Position found for", this.props.address);

        this.setState({ center: [x, y] });
      } else {
        console.log("Map -- No position found for", this.props.address);
      }
    } catch (err) {
      console.log("Map -- Error:", err);
    }
  }

  render() {
    if (this.state.center.length === 0) return null;
    console.log("Address @", this.state.center);
    return (
      <Map
        className={this.props.className}
        view={{ center: this.state.center, zoom: 15 }}
      >
        <Layers>
          <layer.Tile />
          <layer.Vector source={markers} style={markers.style} zIndex="1" />
        </Layers>
        <Controls attribution={false} zoom={true}>
          <control.Rotate />
          <control.ScaleLine />
          <control.Zoom />
        </Controls>
      </Map>
    );
  }
}
