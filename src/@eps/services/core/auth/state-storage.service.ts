import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  constructor(private $sessionStorage: SessionStorageService) {}

  getPreviousState(): any {
    return this.$sessionStorage.retrieve('previousState');
  }

  resetPreviousState(): void {
    this.$sessionStorage.clear('previousState');
  }

  storePreviousState(previousStateName, previousStateParams): void {
    const previousState = { name: previousStateName, params: previousStateParams };
    this.$sessionStorage.store('previousState', previousState);
  }

  getDestinationState(): any {
    return this.$sessionStorage.retrieve('destinationState');
  }

  storeUrl(url: string): void {
    this.$sessionStorage.store('previousUrl', url);
  }

  getUrl(): any {
    return this.$sessionStorage.retrieve('previousUrl');
  }

  storeDestinationState(destinationState, destinationStateParams, fromState): void {
    const destinationInfo = {
      destination: {
        name: destinationState.name,
        data: destinationState.data,
      },
      params: destinationStateParams,
      from: {
        name: fromState.name,
      },
    };
    this.$sessionStorage.store('destinationState', destinationInfo);
  }
}
