import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { getMarkersThunk } from "../../thunks";

const mapStyles = {
  map: {
    position: "absolute",
    width: "50%",
    height: "50%",
    margin: "0 auto",
    border: "10px solid black",
    borderRadius: "10px",
    display: "flex",
  },
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
  componentDidMount() {
    this.props.loadMarkers();
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }
  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }
  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, (c) => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }
  render() {
    /* ALL ZIP CODES ARE AVAILABLE THROUGH this.props.markers */
    console.log(this.props.markers);
    console.log(this.props.markers[0]);
    const style = Object.assign({}, mapStyles.map);
    return (
      <div className="d-flex justify-content-center p-2 bd-highlight">
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    markers: state.map,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadMarkers: () => dispatch(getMarkersThunk()),
  };
};

export default connect(mapState, mapDispatch)(CurrentLocation);

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};
