'use client';
import React, { Component } from 'react';
import Scanner from './Scanner';

interface PageState {
  scanning: boolean;
  results: Array<{ codeResult: { code: string } }>;
}

export default class Page extends Component<{}, PageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      scanning: false,
      results: [],
    };

    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  private _scan(): void {
    this.setState({ scanning: !this.state.scanning });
  }

  private _onDetected(result: { codeResult: { code: string } }): void {
    this.setState((prevState) => ({
      results: [...prevState.results, result],
    }));
  }

  render() {
    return (
      <div>
        <h1>Barcode Scanner</h1>
        {/* Button to toggle scanning */}
        <button onClick={this._scan}>
          {this.state.scanning ? 'Stop' : 'Start'}
        </button>

        {/* Show Scanner while scanning is active */}
        {this.state.scanning && (
          <Scanner onDetected={this._onDetected} />
        )}

        {/* Show results only when scanning stops */}
        {!this.state.scanning && (
          <div>
            <h2>Scanned Barcodes</h2>
            <ul>
              {this.state.results.map((result, index) => (
                <li key={`${result.codeResult.code}-${index}`}>
                  Barcode {index + 1}: <strong>{result.codeResult.code}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
