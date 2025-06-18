import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  mostActiveUsers: any[] = [];
  mostUsedTags: any[] = [];
  notesChart: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAnalytics().subscribe(data => {
      // Set most active users and tags
      this.mostActiveUsers = data.mostActiveUsers;
      this.mostUsedTags = data.mostUsedTags;

      // Extract labels and values for notes per day chart
      const labels = data.notesPerDay.map((item: any) => item._id);
      const values = data.notesPerDay.map((item: any) => item.count);

      if (this.notesChart) {
        this.notesChart.destroy();
      }

      this.notesChart = new Chart("notesChart", {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Notes Created',
            data: values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            x: { display: true, title: { display: true, text: 'Date' } },
            y: { display: true, beginAtZero: true }
          }
        }
      });
    });
  }
}

