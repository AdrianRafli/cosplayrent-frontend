import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-belajarsse',
  templateUrl: './belajarsse.page.html',
  styleUrls: ['./belajarsse.page.scss'],
})
export class BelajarssePage implements OnInit, OnDestroy {
  resp: any[] = [];  // Array to hold the parsed data
  private eventSource: EventSource | null = null;
  tampil: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // Initialize the SSE connection with the correct URL
    this.eventSource = new EventSource('http://localhost:8080/events');

    this.eventSource.onopen = () => {
      console.log('SSE connection opened');  // Log when the connection is successfully opened
    };

    // Listen for all incoming messages
    this.eventSource.onmessage = (event: MessageEvent) => {
      console.log('Received event:', event);  // Log the raw event to see the full data

      // Parse the JSON data and add it to the response array
      try {
        const data = JSON.parse(event.data);
        console.log('Parsed data:', data);  // Log the parsed data for debugging
        this.tampil = data;
        this.resp.push(data);  // Add the data to the response array

        // Manually trigger change detection after updating the `resp` array
        this.cdRef.detectChanges();
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.eventSource?.close();
    };
  }

  ngOnDestroy() {
    // Close the SSE connection when the component is destroyed
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
