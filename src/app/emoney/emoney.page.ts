import { Component, OnInit } from '@angular/core';

// Define the Transaction interface
interface Transaction {
  type: string;
  time: string; // Time should be in a format that can be parsed
  amount: number;
}

@Component({
  selector: 'app-emoney',
  templateUrl: './emoney.page.html',
  styleUrls: ['./emoney.page.scss'],
})
export class EmoneyPage implements OnInit {
  username: string;
  emoney: number;
  transactions: Transaction[];

  constructor() {
    this.username = "User123";
    this.emoney = 320000; // Example initial value
    this.transactions = [
      { type: 'Transfer', time: '2023-11-29T19:12:00', amount: 600000 }, // ISO 8601 format
      { type: 'Top Up', time: '2023-11-29T18:12:00', amount: 260000 },
      { type: 'Top Up', time: '2024-11-28T19:12:00', amount: 260000 },
    ];
  }

  ngOnInit() {
    // Sort transactions by date and time in descending order
    this.transactions.sort((a, b) => {
      const dateA = new Date(a.time).getTime();
      const dateB = new Date(b.time).getTime();

      // First compare by date
      if (dateB !== dateA) {
        return dateB - dateA; // Sort by date descending
      }

      // If dates are the same, compare by time
      return dateB - dateA; // This will also sort by time since we are using the same date comparison
    });
  }
}
