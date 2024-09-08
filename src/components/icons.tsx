import {
  CalendarCheck2,
  Images,
  Users,
  Timer,
  CheckCircle,
  Circle,
  Wallet,
} from "lucide-react";
import { HTMLAttributes } from "react";

export const Icons = {
  circle: Circle,
  users: Users,
  images: Images,
  calendar: CalendarCheck2,
  timer: Timer,
  wallet: Wallet,
  "check-circle": CheckCircle,
  eyeIcon: (props: HTMLAttributes<SVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  spinnerIcon: (props: HTMLAttributes<SVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
    >
      <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12" />
    </svg>
  ),
  arrowDown: (props: HTMLAttributes<SVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
    >
      <path d="M98.9 184.7l1.8 2.1 136 156.5c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6L411 187.1l2.3-2.6c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8H112.6c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z"></path>
    </svg>
  ),
  bluePrint: (props: HTMLAttributes<SVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512 512"
    >
      <path d="M469.333,51.2H128c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h341.333c13.875,0,25.6,11.725,25.6,25.6     v375.467c0,14.353-11.238,25.6-25.6,25.6H51.2c-18.825,0-34.133-15.309-34.133-34.133c0-18.825,15.309-34.133,34.133-34.133     s34.133,15.309,34.133,34.133c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533V51.2     C102.4,22.963,79.437,0,51.2,0S0,22.963,0,51.2v409.6C0,489.037,22.963,512,51.2,512h418.133     C493.261,512,512,493.261,512,469.333V93.867C512,70.34,492.86,51.2,469.333,51.2z M17.067,51.2     c0-18.825,15.309-34.133,34.133-34.133S85.333,32.375,85.333,51.2v371.55c-9.071-8.149-21.018-13.15-34.133-13.15     s-25.071,5-34.133,13.15V51.2z" />
      <path d="M349.867,443.733c-4.719,0-8.533,3.823-8.533,8.533c0,4.71,3.814,8.533,8.533,8.533h102.4     c4.719,0,8.533-3.823,8.533-8.533V110.933c0-4.71-3.814-8.533-8.533-8.533h-307.2c-4.719,0-8.533,3.823-8.533,8.533v341.333     c0,4.71,3.814,8.533,8.533,8.533h170.667c4.719,0,8.533-3.823,8.533-8.533c0-39.467,29.918-72.073,68.267-76.331v42.197     c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533v-51.2c0-4.71-3.814-8.533-8.533-8.533     c-48.879,0-89.097,37.564-93.432,85.333H153.6V307.2h162.133c4.719,0,8.533-3.823,8.533-8.533v-34.133     c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v25.6H153.6V119.467h153.6V179.2c0,4.71,3.814,8.533,8.533,8.533     s8.533-3.823,8.533-8.533v-59.733h119.467v170.667h-42.667c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h42.667     v136.533H349.867z" />
    </svg>
  ),
};
