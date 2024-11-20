// src/contexts/ThemeContext.js
import React, { Component } from 'react';

export const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  state = {
    isDarkMode: false
  };

  componentDidMount() {
    this.setUpMediaQuery();
  }

  componentWillUnmount() {
    this.cleanUpMediaQuery();
  }

  setUpMediaQuery = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.setState({ isDarkMode: this.darkModeMediaQuery.matches });

      this.handler = (e) => this.setState({ isDarkMode: e.matches });

      // Check if addEventListener is supported
      if (this.darkModeMediaQuery.addEventListener) {
        this.darkModeMediaQuery.addEventListener('change', this.handler);
      } else if (this.darkModeMediaQuery.addListener) {
        // Fallback for older browsers
        this.darkModeMediaQuery.addListener(this.handler);
      }
    }
  }

  cleanUpMediaQuery = () => {
    if (this.darkModeMediaQuery) {
      if (this.darkModeMediaQuery.removeEventListener) {
        this.darkModeMediaQuery.removeEventListener('change', this.handler);
      } else if (this.darkModeMediaQuery.removeListener) {
        // Fallback for older browsers
        this.darkModeMediaQuery.removeListener(this.handler);
      }
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={{ isDarkMode: this.state.isDarkMode }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}