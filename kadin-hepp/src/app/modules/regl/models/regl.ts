import { EventSourceInput } from '@fullcalendar/core';
import { User } from '../../auth/models/user';

export interface ReglModel {
  id?: string;
  createdUser: User;
  events: EventSourceInput;
}
