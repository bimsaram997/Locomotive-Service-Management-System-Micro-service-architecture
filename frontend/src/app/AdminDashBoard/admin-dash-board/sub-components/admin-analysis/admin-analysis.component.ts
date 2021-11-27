import { LoadTrialService } from 'src/app/service/load-trial.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-analysis',
  templateUrl: './admin-analysis.component.html',
  styleUrls: ['./admin-analysis.component.css'],
})
export class AdminAnalysisComponent implements OnInit {
  public selectedIndex: number = 0;
  loadArray: any;
  countDraftLoad: any;
  countPassedtLoad: any;
  countPendingLoad: any;
  countTotalPendingLoad: any;
  averageLoadTrials: number;
  loadLength: any;
  commentArray: any;
  commentLength: any;
  doMoreActionsComments: any;
  resolvedActionsComments: any;
  acceptedComments: any;
  constructor(
    private _location: Location,
    private loadService: LoadTrialService
  ) {}

  ngOnInit(): void {
    this.getLoadTrial();
    this.getAllComments();
  }

  backClicked() {
    this._location.back();
  }

  public getLoadTrial() {
    const values = JSON.parse(localStorage.getItem('currentUser'));
    const object = {
      userNic: values.userNic,
      userRole: values.userRole,
    };
    this.loadService.getLoadTrialAssigned(object).subscribe((resp) => {
      this.loadArray = resp;
      this.loadLength = this.loadArray.length;

      const _filterDraftLoad = this.loadArray.filter((p) => p.status === 1);
      this.countDraftLoad = _filterDraftLoad.length;

      const _filterPasstLoad = this.loadArray.filter((p) => p.status === 2);
      this.countPassedtLoad = _filterPasstLoad.length;

      const _filterPendingtLoad = this.loadArray.filter((p) => p.status === 3);
      this.countPendingLoad = _filterPendingtLoad.length;

      const _totalPendingtLoad = this.loadArray.filter((p) => p.status != 2);
      this.countTotalPendingLoad = _totalPendingtLoad.length;

      this.averageLoadTrials = Math.round(this.loadArray.length / 12);
    });
  }

  public getAllComments() {
    this.loadService.getAllComments().subscribe((resp) => {
      this.commentArray = resp;
      this.commentLength = this.commentArray.length;

      const doMoreActionsComments = this.commentArray.filter(
        (p) => p.status === 3
      );
      this.doMoreActionsComments = doMoreActionsComments.length;

      const resolvedActionsComments = this.commentArray.filter(
        (p) => p.status === 4
      );
      this.resolvedActionsComments = resolvedActionsComments.length;

      const accepted = this.commentArray.filter((p) => p.status === 2);
      this.acceptedComments = accepted.length;
    });
  }
}
