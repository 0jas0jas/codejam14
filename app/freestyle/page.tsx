'use client'
import React, { Component } from "react";
import Scanner from "./Scanner";
import Result from "./Results";

interface PageState {
  scanning: boolean; // Indicates if the scanner is active
  results: Array<{ codeResult: { code: string } }>; // Represents scanned barcode results
}

export default class Page extends Component<{}, PageState> {
  constructor(props: {}) {
    super(props);
    // Initialize the state
    this.state = {
      scanning: false, // Scanning starts as inactive
      results: [], // No results initially
    };

    // Bind methods to the class instance
    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  // Toggles the scanning state
  private _scan(): void {
    this.setState({ scanning: !this.state.scanning });
  }

  // Adds a detected barcode to the results
  private _onDetected(result: { codeResult: { code: string } }): void {
    this.setState((prevState) => ({
      results: [...prevState.results, result], // Append the new result
    }));
  }

  render() {
    return (
      <div>
        {/* Button to toggle scanning */}
        <button onClick={this._scan}>
          {this.state.scanning ? "Stop" : "Start"}
        </button>

        {/* Display scanned results */}
        <ul className="results">
          {this.state.results.map((result, index) => (
            <Result
              key={`${result.codeResult.code}-${index}`} // Unique key for each result
              result={result}
            />
          ))}
        </ul>

        {/* Conditionally render the Scanner component */}
        {this.state.scanning && (
          <Scanner onDetected={this._onDetected} />
        )}
      </div>
    );
  }
}
