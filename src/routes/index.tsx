import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronUp, Sparkles, Phone, UserRound, Bell, Gauge, MapPin, FileText, ChartPie, Settings, Navigation, ClipboardList, UsersRound, Users, Grid3X3, Truck, Search, RefreshCw, Filter, ArrowDownAZ, KeyRound, Smartphone, Route as RouteIcon, Video, Camera, Volume2, Hand, Play, Pause, Star, Map, Radio, Tag, Scan, LocateFixed, ShieldCheck, Timer, TriangleAlert, ThumbsUp, Share2, MapPinned, BusFront, Fence, CircleArrowRight, Crosshair, CircleUserRound, PanelTop, Asterisk, Car, Zap, SlidersHorizontal, ChevronDown, Flag, X, Check, Building2, CheckCircle2, Clock, XCircle, Trash2, Edit3, ArrowLeftRight, Minus, Plus, ZoomIn, ZoomOut, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mapAsset from '@/assets/oklahoma-city-light.asset.json';
import { busRouteCoords, car1RouteCoords, car2RouteCoords, shuttleStops } from '@/data/shuttle-real-routes';
import { valsadRoutePoints, tripStops } from '@/data/trips-valsad-route';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [ { title: 'Uffizio | Live Tracking' }, { name: 'description', content: 'Uffizio live vehicle tracking with object status, Oklahoma City map, and ambulance information.' }, { property: 'og:title', content: 'Uffizio | Live Tracking' }, { property: 'og:description', content: 'Live vehicle locations, fleet status and ambulance information.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' } ] }),
 component: LiveTracking,
});

export interface ShuttleVehicle {
 id: string;
 vehicleNumber: string;
 driver: string;
 status: 'running' | 'completed' | 'upcoming' | 'failed';
 timestamp: string;
}

export interface ShuttleTrip {
 id: string;
 routeName: string;
 vehicleChip: string;
 shiftChip: string;
 shiftType: 'IN' | 'OUT';
 tripId: string;
 occupancy: string;
 hasAlert: boolean;
 eta: string;
 delayText: string;
 isLate: boolean;
 vehicleNumber: string;
 driver: string;
 status: 'running' | 'completed' | 'upcoming' | 'failed';
 timestamp: string;
 coords: { top: string; left: string };
 vendor: string;
 office: string;
 vehicles: ShuttleVehicle[];
}

const shuttleVendors = ['All', 'City Express Logistics', 'FleetPro Mobility', 'Apex Shuttles', 'Vashi Transport Co.'];
const shuttleOffices = ['BKC Tech Park', 'Mindspace Airoli', 'Powai SEZ', 'Vashi Hub'];
const shuttleShifts = ['07:00 IN', '08:00 IN', '17:30 OUT', '18:00 OUT'];

const shuttleKpis = [
 { label: 'Running', count: 2, key: 'running' },
 { label: 'Done', count: 1, key: 'completed' },
 { label: 'Upcoming', count: 1, key: 'upcoming' },
 { label: 'Failed', count: 0, key: 'failed' },
 { label: 'Total', count: 4, key: 'total' },
];


export interface DetailEmployee {
  name: string;
  gender: 'female' | 'male';
  status: 'Boarded' | 'Not Boarded' | 'No-show' | 'Cancelled' | 'Ad-hoc';
  boardingTime?: string;
  phone: string;
}

export interface DetailStop {
  id: string;
  num: string;
  name: string;
  status: 'current' | 'reached_ontime' | 'reached_late' | 'skipped' | 'pending';
  planned: string;
  etaOrActual: string;
  delay?: string;
  isLate?: boolean;
  employeeCount: string;
  employees?: DetailEmployee[];
}

export const shuttleDetailData: {
  tripId: string;
  direction: 'IN' | 'OUT';
  status: 'ONGOING' | 'PLANNED' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  alerts: string[];
  summaryCounters: {
    totalEmployees: number;
    boarded: number;
    notBoarded: number;
    pendingPickup: number;
    women: number;
    noShow: number;
    cancelled: number;
    adHoc: number;
  };
  shift: string;
  plannedTime: string;
  actualTime: string;
  vendor: string;
  driver: {
    name: string;
    phone: string;
    rating: string;
  };
  vehicle: {
    number: string;
    fleet: string;
    capacity: string;
    type: string;
    previousNote?: string;
  };
  stops: DetailStop[];
} = {
  tripId: 'Trip-1020959',
  direction: 'IN' as const,
  status: 'ONGOING' as const,
  alerts: ['Women Travelling Alone', 'First PickUp Women'],
  summaryCounters: {
    totalEmployees: 17,
    boarded: 0,
    notBoarded: 1,
    pendingPickup: 16,
    women: 1,
    noShow: 0,
    cancelled: 0,
    adHoc: 0,
  },
  shift: 'Thu, 09 Oct, 07:00 IN',
  plannedTime: '06:20 - 07:00',
  actualTime: '06:28 - —',
  vendor: 'City Commute Pvt. Ltd',
  driver: {
    name: 'Pravin Dhondibhau Waman',
    phone: '9321215642',
    rating: '5.0',
  },
  vehicle: {
    number: 'MH-04-MR-8993',
    fleet: '8993',
    capacity: '17 seats',
    type: 'TT',
    previousNote: 'Vehicle changed • Previous: MH-04-XX-1234',
  },
  stops: [
    {
      id: 'stop-1',
      num: '01',
      name: 'THANE STATION KOPRI',
      status: 'current' as const,
      planned: '06:20',
      etaOrActual: '07:00',
      delay: '+5 hr 9 mins',
      isLate: true,
      employeeCount: '0/1',
      employees: [
        { name: 'Rhea Sharma', gender: 'female' as const, status: 'Boarded' as const, boardingTime: '06:18', phone: '9820112233' },
        { name: 'Amit Shah', gender: 'male' as const, status: 'No-show' as const, boardingTime: '—', phone: '9820445566' },
        { name: 'Raj Patel', gender: 'male' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820778899' },
      ],
    },
    {
      id: 'stop-2',
      num: '02',
      name: 'TEEN HATH NAKA',
      status: 'reached_late' as const,
      planned: '06:25',
      etaOrActual: '06:33',
      delay: '+8 mins',
      isLate: true,
      employeeCount: '2/2',
      employees: [
        { name: 'Priya Nair', gender: 'female' as const, status: 'Boarded' as const, boardingTime: '06:31', phone: '9820123456' },
        { name: 'Karan Mehta', gender: 'male' as const, status: 'Boarded' as const, boardingTime: '06:32', phone: '9820654321' },
      ],
    },
    {
      id: 'stop-3',
      num: '03',
      name: 'WAGLE ESTATE',
      status: 'reached_late' as const,
      planned: '06:32',
      etaOrActual: '06:40',
      delay: '+8 mins',
      isLate: true,
      employeeCount: '4/4',
      employees: [
        { name: 'Sneha Kulkarni', gender: 'female' as const, status: 'Boarded' as const, boardingTime: '06:38', phone: '9820987654' },
        { name: 'Vikram Joshi', gender: 'male' as const, status: 'Boarded' as const, boardingTime: '06:39', phone: '9820345678' },
      ],
    },
    {
      id: 'stop-4',
      num: '04',
      name: 'MULUND CHECK NAKA',
      status: 'pending' as const,
      planned: '06:40',
      etaOrActual: '07:15',
      delay: 'Pending',
      isLate: false,
      employeeCount: '0/3',
      employees: [
        { name: 'Rahul Gupta', gender: 'male' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820111222' },
        { name: 'Pooja Verma', gender: 'female' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820333444' },
        { name: 'Deepa Seth', gender: 'female' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820555666' },
      ],
    },
    {
      id: 'stop-5',
      num: '05',
      name: 'BKC CONNECTOR',
      status: 'pending' as const,
      planned: '06:50',
      etaOrActual: '07:25',
      delay: 'Pending',
      isLate: false,
      employeeCount: '0/4',
      employees: [
        { name: 'Rohit Deshmukh', gender: 'male' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820778888' },
        { name: 'Ananya Roy', gender: 'female' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820999000' },
      ],
    },
    {
      id: 'stop-6',
      num: '06',
      name: 'BKC TECH PARK (DESTINATION)',
      status: 'pending' as const,
      planned: '07:00',
      etaOrActual: '07:35',
      delay: 'Pending',
      isLate: false,
      employeeCount: '0/3',
      employees: [
        { name: 'Office Main Campus', gender: 'male' as const, status: 'Not Boarded' as const, boardingTime: '—', phone: '9820000000' },
      ],
    },
  ],
};

const shuttleTrips: ShuttleTrip[] = [
 {
  id: 'trip-1020959',
  routeName: 'Thane West - BKC Tech Park Line 4',
  vehicleChip: 'MH-04-MR-8993',
  shiftChip: '07:00 IN',
  shiftType: 'IN',
  tripId: 'Trip-1020959',
  occupancy: '12(17)',
  hasAlert: true,
  eta: 'ETA- 07:15 AM',
  delayText: '(+24 mins)',
  isLate: true,
  vehicleNumber: 'MH-04-MR-8993',
  driver: 'HP Driver 104',
  status: 'running',
  timestamp: '13-10-2026 10:01:53',
  coords: { top: '33%', left: '47%' },
  vendor: 'City Express Logistics',
  office: 'BKC Tech Park',
  vehicles: [
   { id: 'veh-8993', vehicleNumber: 'MH-04-MR-8993', driver: 'HP Driver 104', status: 'running', timestamp: '10:01:53' },
   { id: 'veh-2210', vehicleNumber: 'MH-04-AB-2210', driver: 'Suresh Patil', status: 'running', timestamp: '10:02:10' },
  ],
 },
 {
  id: 'trip-1020960',
  routeName: 'Airoli Mindspace - Powai Express',
  vehicleChip: 'MH-43-BP-1102',
  shiftChip: '08:00 IN',
  shiftType: 'IN',
  tripId: 'Trip-1020960',
  occupancy: '22(26)',
  hasAlert: false,
  eta: 'ETA- 07:48 AM',
  delayText: '(On time)',
  isLate: false,
  vehicleNumber: 'MH-43-BP-1102',
  driver: 'Sunil Shinde',
  status: 'running',
  timestamp: '13-10-2026 10:01:45',
  coords: { top: '53%', left: '62%' },
  vendor: 'FleetPro Mobility',
  office: 'Mindspace Airoli',
  vehicles: [
   { id: 'veh-1102', vehicleNumber: 'MH-43-BP-1102', driver: 'Sunil Shinde', status: 'running', timestamp: '10:01:45' },
   { id: 'veh-9821', vehicleNumber: 'MH-43-AK-9821', driver: 'Ganesh More', status: 'running', timestamp: '10:01:12' },
  ],
 },
 {
  id: 'trip-1020961',
  routeName: 'Vashi Hwy - BKC Hub Direct',
  vehicleChip: 'MH-02-ER-4412',
  shiftChip: '07:00 IN',
  shiftType: 'IN',
  tripId: 'Trip-1020961',
  occupancy: '17(17)',
  hasAlert: false,
  eta: 'ETA- Arrived',
  delayText: '(On time)',
  isLate: false,
  vehicleNumber: 'MH-02-ER-4412',
  driver: 'Mahesh Jadhav',
  status: 'completed',
  timestamp: '13-10-2026 09:58:12',
  coords: { top: '39%', left: '76%' },
  vendor: 'City Express Logistics',
  office: 'BKC Tech Park',
  vehicles: [
   { id: 'veh-4412', vehicleNumber: 'MH-02-ER-4412', driver: 'Mahesh Jadhav', status: 'completed', timestamp: '09:58:12' },
  ],
 },
 {
  id: 'trip-1020962',
  routeName: 'Borivali - Mindspace Airoli Evening',
  vehicleChip: 'MH-04-HX-9081',
  shiftChip: '17:30 OUT',
  shiftType: 'OUT',
  tripId: 'Trip-1020962',
  occupancy: '0(18)',
  hasAlert: false,
  eta: 'ETA- 05:30 PM',
  delayText: '(On time)',
  isLate: false,
  vehicleNumber: 'MH-04-HX-9081',
  driver: 'Pravin Waman',
  status: 'upcoming',
  timestamp: '13-10-2026 09:45:00',
  coords: { top: '68%', left: '52%' },
  vendor: 'Apex Shuttles',
  office: 'Mindspace Airoli',
  vehicles: [
   { id: 'veh-9081', vehicleNumber: 'MH-04-HX-9081', driver: 'Pravin Waman', status: 'upcoming', timestamp: '09:45:00' },
  ],
 },
];

const vehicles = [
 { name:'Vehicle1111 - Vehicle1111',date:'31-01-2024 11:03:17 AM',group:'ABC',status:'blue',value:1 },
 { name:'truck - truck',date:'-',group:'ABC',status:'grey',value:0 },
 { name:'RV06 BANGLORE - RV06 B...',date:'07-03-2024 08:06:09 PM',group:'Aarvi demo',status:'blue',value:0 },
 { name:'KA05AM2781 - KA05AM27...',date:'11-03-2024 12:50:42 PM',group:'Aarvi demo',status:'blue',value:0 },
 { name:'FT112 - FT112',date:'14-03-2024 11:34:56 AM',group:'Aarvi demo',status:'red',value:0 },
 { name:'FMC920 - FMC920',date:'20-02-2024 06:06:15 PM',group:'Aarvi demo',status:'blue',value:0 },
 { name:'FMB120 - FMB120',date:'20-02-2024 11:35:58 AM',group:'Aarvi demo',status:'blue',value:0 },
 { name:'DC4 DASHCAM - DC4 DAS...',date:'11-03-2024 06:47:14 PM',group:'Aarvi demo',status:'blue',value:0 },
 { name:'AlgoM test - AlgoM test',date:'14-03-2024 11:35:16 AM',group:'Aarvi demo',status:'red',value:0 },
 { name:'869689043721539 - 86968...',date:'14-03-2024 11:11:27 AM',group:'Aarvi demo',status:'red',value:0 },
 { name:'4G OBD - 4G OBD',date:'14-03-2024 11:35:15 AM',group:'Aarvi demo',status:'red',value:0 },
];

function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
 const toRad = Math.PI / 180;
 const toDeg = 180 / Math.PI;
 const dLon = (lon2 - lon1) * toRad;
 const y = Math.sin(dLon) * Math.cos(lat2 * toRad);
 const x =
  Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) -
  Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos(dLon);
 return (Math.atan2(y, x) * toDeg + 360) % 360;
}

function ShuttleRealMap({
 activeTrip,
 isFocused,
 onVehicleClick,
 isDetailMode = false,
 showActualRoute = true,
 setShowActualRoute,
 showPlannedRoute = true,
 setShowPlannedRoute,
 followVehicle = false,
 setFollowVehicle,
 isConnectionRetrying = false,
}: {
 activeTrip: ShuttleTrip;
 isFocused: boolean;
 onVehicleClick: () => void;
 isDetailMode?: boolean;
 showActualRoute?: boolean;
 setShowActualRoute?: (val: boolean) => void;
 showPlannedRoute?: boolean;
 setShowPlannedRoute?: (val: boolean) => void;
 followVehicle?: boolean;
 setFollowVehicle?: (val: boolean) => void;
 isConnectionRetrying?: boolean;
}) {
 const mapContainerRef = useRef<HTMLDivElement>(null);
 const mapInstanceRef = useRef<any>(null);
 const busMarkerRef = useRef<any>(null);
 const car1MarkerRef = useRef<any>(null);
 const car2MarkerRef = useRef<any>(null);
 const actualPolylineRef = useRef<any>(null);
 const plannedPolylineRef = useRef<any>(null);
 const isDetailModeRef = useRef(isDetailMode);
 const followVehicleRef = useRef(followVehicle);

 useEffect(() => {
  if (!mapContainerRef.current || mapInstanceRef.current) return;

  let animId: number;
  let isMounted = true;

  import('leaflet').then(L => {
   if (!isMounted || !mapContainerRef.current) return;

   // Real Google Map initialized centered along Fayetteville / Johnson road corridor
   const map = L.map(mapContainerRef.current, {
    center: [36.102, -94.168],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
   });
   mapInstanceRef.current = map;

   // Real Google Maps Roadmap Tile Layer
   L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
   }).addTo(map);

   // Google attribution & controls
   L.control.attribution({ position: 'bottomright', prefix: 'Google Maps' }).addTo(map);
   L.control.zoom({ position: 'bottomright' }).addTo(map);

   // Actual Route Polylines (solid blue)
   const glowLine = L.polyline(busRouteCoords, {
    color: '#0284c7',
    weight: 7,
    opacity: 0.45,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   const actualLine = L.polyline(busRouteCoords, {
    color: '#0284c7',
    weight: 4.5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);
   actualPolylineRef.current = actualLine;

   L.polyline(busRouteCoords, {
    color: '#ffffff',
    weight: 1.5,
    opacity: 0.9,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   // Planned Route Polyline (dotted magenta #d946ef)
   const plannedCoords = busRouteCoords.map(([lat, lng], i) => [
    lat + 0.0003 * Math.sin(i / 12),
    lng + 0.0003 * Math.cos(i / 12),
   ]);
   const plannedLine = L.polyline(plannedCoords as any, {
    color: '#d946ef',
    weight: 3.5,
    opacity: 0.95,
    dashArray: '5, 8',
    lineCap: 'round',
    lineJoin: 'round',
   });
   plannedPolylineRef.current = plannedLine;
   if (isDetailModeRef.current) {
    plannedLine.addTo(map);
   }

   // Waypoint Stops & Hub Pins on the real map
   shuttleStops.forEach(stop => {
    const isHub = stop.type === 'hub';
    const html = isHub
     ? `<div class="shuttle-office-pin" title="${stop.name}">
         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
        </div>`
     : `<div class="shuttle-stop-pin" title="${stop.name}">${stop.num || ''}</div>`;

    const icon = L.divIcon({
     html,
     className: isHub ? 'custom-hub-icon' : 'custom-stop-icon',
     iconSize: [26, 26],
     iconAnchor: [13, 13],
    });

    L.marker([stop.lat, stop.lng], { icon })
     .bindPopup(`<strong>${stop.name}</strong><br><span style="color:#64748b;font-size:11px;">Scheduled stop • Passenger Boarding</span>`)
     .addTo(map);
   });

   // Vector vehicle representations
   const busSvg = `<svg width="26" height="52" viewBox="0 0 34 68" fill="none" style="display:block;">
    <rect x="0" y="11" width="3.5" height="5" rx="1.5" fill="#1e293b"/>
    <rect x="30.5" y="11" width="3.5" height="5" rx="1.5" fill="#1e293b"/>
    <rect x="3" y="2" width="28" height="62" rx="7" fill="#f8fafc" stroke="#334155" stroke-width="1.8"/>
    <path d="M 5.5 12 C 5.5 6 28.5 6 28.5 12 L 27.5 17 C 27.5 17 6.5 17 6.5 17 Z" fill="#1e293b"/>
    <rect x="6.5" y="20" width="21" height="40" rx="3.5" fill="#e2e8f0"/>
    <circle cx="17" cy="27" r="1.8" fill="#1e293b"/>
    <circle cx="17" cy="33" r="1.8" fill="#1e293b"/>
    <circle cx="17" cy="39" r="1.8" fill="#1e293b"/>
    <circle cx="17" cy="45" r="1.8" fill="#1e293b"/>
    <rect x="5.5" y="60.5" width="4.5" height="2" rx="0.8" fill="#ef4444"/>
    <rect x="24" y="60.5" width="4.5" height="2" rx="0.8" fill="#ef4444"/>
    <rect x="11.5" y="61.5" width="11" height="1.5" rx="0.5" fill="#334155"/>
   </svg>`;

   const carSvg = `<svg width="18" height="34" viewBox="0 0 22 42" fill="none" style="display:block;">
    <rect x="0" y="11" width="2.5" height="4" rx="1" fill="#334155"/>
    <rect x="19.5" y="11" width="2.5" height="4" rx="1" fill="#334155"/>
    <path d="M 4 8 C 4 3 18 3 18 8 L 19 32 C 19 37 3 37 3 32 Z" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/>
    <path d="M 6 5 C 6 4 16 4 16 5" stroke="#cbd5e1" stroke-width="1"/>
    <path d="M 5 11 C 5 8 17 8 17 11 L 16 16 L 6 16 Z" fill="#1e293b"/>
    <rect x="6" y="17" width="10" height="9" rx="1.5" fill="#f8fafc"/>
    <path d="M 5.5 28 L 6.5 26 L 15.5 26 L 16.5 28 Z" fill="#1e293b"/>
    <rect x="4.5" y="34.5" width="3" height="1.5" rx="0.5" fill="#ef4444"/>
    <rect x="14.5" y="34.5" width="3" height="1.5" rx="0.5" fill="#ef4444"/>
   </svg>`;

   // Main Moving Shuttle Bus Marker
   const bStart = busRouteCoords[0]!;
   const busIcon = L.divIcon({
    html: `
     <div class="shuttle-map-vehicle-container">
      <div id="shuttle-bus-rotator" class="vehicle-rotator" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.38));">
       ${busSvg}
      </div>
      <div class="shuttle-live-telematics-badge" style="position: absolute; left: 32px; top: 50%; transform: translateY(-50%); pointer-events: none;">
       <span class="live-pulse-dot"></span>
       <span class="badge-veh" id="bus-badge-veh">${activeTrip.vehicleNumber}</span>
       <span class="badge-sep">•</span>
       <span class="badge-spd" id="bus-badge-spd">38 km/h</span>
       <span class="badge-sep">•</span>
       <span id="bus-badge-delay" style="color: ${activeTrip.isLate ? '#fb923c' : '#4ade80'}; font-weight: 600;">
        ${activeTrip.isLate ? activeTrip.delayText : 'On time'}
       </span>
      </div>
     </div>
    `,
    className: 'custom-leaflet-vehicle-icon',
    iconSize: [34, 68],
    iconAnchor: [17, 34],
   });

   const busMarker = L.marker([bStart[0], bStart[1]], { icon: busIcon, zIndexOffset: 1000 }).addTo(map);
   busMarker.on('click', onVehicleClick);
   busMarkerRef.current = busMarker;

   // Highway Ambient Car 1 (I-49)
   const c1Start = car1RouteCoords[0]!;
   const car1Icon = L.divIcon({
    html: `
     <div class="shuttle-map-vehicle-container" style="width: 22px; height: 42px;">
      <div id="shuttle-car1-rotator" class="vehicle-rotator" style="opacity: 0.88;">
       ${carSvg}
      </div>
     </div>
    `,
    className: 'custom-leaflet-vehicle-icon',
    iconSize: [22, 42],
    iconAnchor: [11, 21],
   });
   const car1Marker = L.marker([c1Start[0], c1Start[1]], { icon: car1Icon, zIndexOffset: 500 }).addTo(map);
   car1MarkerRef.current = car1Marker;

   // Highway Ambient Car 2 (Hwy 71B)
   const c2Start = car2RouteCoords[0]!;
   const car2Icon = L.divIcon({
    html: `
     <div class="shuttle-map-vehicle-container" style="width: 22px; height: 42px;">
      <div id="shuttle-car2-rotator" class="vehicle-rotator" style="opacity: 0.88;">
       ${carSvg}
      </div>
     </div>
    `,
    className: 'custom-leaflet-vehicle-icon',
    iconSize: [22, 42],
    iconAnchor: [11, 21],
   });
   const car2Marker = L.marker([c2Start[0], c2Start[1]], { icon: car2Icon, zIndexOffset: 500 }).addTo(map);
   car2MarkerRef.current = car2Marker;

   // Animation loop along real road coordinates
   let busP = 0.22;
   let car1P = 0.08;
   let car2P = 0.55;
   let lastTime = performance.now();

   const animate = (time: number) => {
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    busP = (busP + delta * 0.018) % 1;
    car1P = (car1P + delta * 0.035) % 1;
    car2P = (car2P + delta * 0.028) % 1;

    // Bus position & bearing along road coordinates
    const bSeg = busP * (busRouteCoords.length - 1);
    const bIdx = Math.floor(bSeg);
    const bT = bSeg - bIdx;
    const bp0 = busRouteCoords[bIdx] ?? busRouteCoords[0]!;
    const bp1 = busRouteCoords[bIdx + 1] ?? bp0;
    const bLat = bp0[0] + (bp1[0] - bp0[0]) * bT;
    const bLng = bp0[1] + (bp1[1] - bp0[1]) * bT;
    const bHeading = getBearing(bp0[0], bp0[1], bp1[0], bp1[1]);

    busMarker.setLatLng([bLat, bLng]);
    const bRot = document.getElementById('shuttle-bus-rotator');
    if (bRot) bRot.style.transform = `rotate(${Math.round(bHeading)}deg)`;

    if (followVehicleRef.current && mapInstanceRef.current) {
     mapInstanceRef.current.panTo([bLat, bLng], { animate: false });
    }

    const isNearStop = Math.abs(busP - 0.2) < 0.02 || Math.abs(busP - 0.5) < 0.02 || Math.abs(busP - 0.75) < 0.02;
    const curSpeed = isNearStop ? 16 : Math.round(38 + Math.sin(busP * 25) * 6);
    const spdEl = document.getElementById('bus-badge-spd');
    if (spdEl) spdEl.textContent = `${curSpeed} km/h`;

    // Car 1 (I-49)
    const c1Seg = car1P * (car1RouteCoords.length - 1);
    const c1Idx = Math.floor(c1Seg);
    const c1T = c1Seg - c1Idx;
    const c1p0 = car1RouteCoords[c1Idx] ?? car1RouteCoords[0]!;
    const c1p1 = car1RouteCoords[c1Idx + 1] ?? c1p0;
    const c1Lat = c1p0[0] + (c1p1[0] - c1p0[0]) * c1T;
    const c1Lng = c1p0[1] + (c1p1[1] - c1p0[1]) * c1T;
    const c1Heading = getBearing(c1p0[0], c1p0[1], c1p1[0], c1p1[1]);

    car1Marker.setLatLng([c1Lat, c1Lng]);
    const c1Rot = document.getElementById('shuttle-car1-rotator');
    if (c1Rot) c1Rot.style.transform = `rotate(${Math.round(c1Heading)}deg)`;

    // Car 2 (Hwy 71B)
    const c2Seg = car2P * (car2RouteCoords.length - 1);
    const c2Idx = Math.floor(c2Seg);
    const c2T = c2Seg - c2Idx;
    const c2p0 = car2RouteCoords[c2Idx] ?? car2RouteCoords[0]!;
    const c2p1 = car2RouteCoords[c2Idx + 1] ?? c2p0;
    const c2Lat = c2p0[0] + (c2p1[0] - c2p0[0]) * c2T;
    const c2Lng = c2p0[1] + (c2p1[1] - c2p0[1]) * c2T;
    const c2Heading = getBearing(c2p0[0], c2p0[1], c2p1[0], c2p1[1]);

    car2Marker.setLatLng([c2Lat, c2Lng]);
    const c2Rot = document.getElementById('shuttle-car2-rotator');
    if (c2Rot) c2Rot.style.transform = `rotate(${Math.round(c2Heading)}deg)`;

    animId = requestAnimationFrame(animate);
   };

   animId = requestAnimationFrame(animate);
  });

  return () => {
   isMounted = false;
   if (animId) cancelAnimationFrame(animId);
   if (mapInstanceRef.current) {
    mapInstanceRef.current.remove();
    mapInstanceRef.current = null;
   }
  };
 }, []);

 useEffect(() => {
  const vehEl = document.getElementById('bus-badge-veh');
  const delayEl = document.getElementById('bus-badge-delay');
  if (vehEl) vehEl.textContent = activeTrip.vehicleNumber;
  if (delayEl) {
   delayEl.textContent = activeTrip.isLate ? activeTrip.delayText : 'On time';
   delayEl.style.color = activeTrip.isLate ? '#fb923c' : '#4ade80';
  }

  const busRot = document.getElementById('shuttle-bus-rotator');
  if (busRot) {
   busRot.style.filter = isFocused
    ? 'drop-shadow(0 0 10px #0284c7) drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
    : 'drop-shadow(0 4px 6px rgba(0,0,0,0.38))';
  }

  if (isFocused && mapInstanceRef.current && busMarkerRef.current) {
   const pos = busMarkerRef.current.getLatLng();
   mapInstanceRef.current.panTo(pos, { animate: true, duration: 0.6 });
  }
 }, [activeTrip, isFocused]);

 useEffect(() => {
  followVehicleRef.current = followVehicle;
 }, [followVehicle]);

 useEffect(() => {
  isDetailModeRef.current = isDetailMode;
  if (car1MarkerRef.current && car2MarkerRef.current) {
   if (isDetailMode) {
    car1MarkerRef.current.setOpacity(0);
    car2MarkerRef.current.setOpacity(0);
   } else {
    car1MarkerRef.current.setOpacity(0.88);
    car2MarkerRef.current.setOpacity(0.88);
   }
  }

  if (plannedPolylineRef.current && mapInstanceRef.current) {
   if (isDetailMode && showPlannedRoute) {
    if (!mapInstanceRef.current.hasLayer(plannedPolylineRef.current)) {
     plannedPolylineRef.current.addTo(mapInstanceRef.current);
    }
   } else {
    if (mapInstanceRef.current.hasLayer(plannedPolylineRef.current)) {
     plannedPolylineRef.current.remove();
    }
   }
  }

  if (actualPolylineRef.current && mapInstanceRef.current) {
   if (isDetailMode && !showActualRoute) {
    if (mapInstanceRef.current.hasLayer(actualPolylineRef.current)) {
     actualPolylineRef.current.remove();
    }
   } else {
    if (!mapInstanceRef.current.hasLayer(actualPolylineRef.current)) {
     actualPolylineRef.current.addTo(mapInstanceRef.current);
    }
   }
  }

  if (isDetailMode && mapInstanceRef.current && actualPolylineRef.current) {
   mapInstanceRef.current.fitBounds(actualPolylineRef.current.getBounds(), {
    padding: [60, 60],
    maxZoom: 14,
   });
  }
 }, [isDetailMode, showActualRoute, showPlannedRoute]);

 return (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
   <div
    ref={mapContainerRef}
    className="shuttle-real-map-container"
    aria-label="Real Google Maps live vehicle tracking"
   />

   {isDetailMode && (
    <>
     {/* Map Route Legend */}
     <div className="map-route-legend" aria-label="Route Layer Legend">
      <label className="map-legend-item">
       <input
        type="checkbox"
        checked={showActualRoute}
        onChange={e => setShowActualRoute?.(e.target.checked)}
       />
       <span className="legend-line-sample actual" />
       <span>Actual Route</span>
      </label>
      <label className="map-legend-item">
       <input
        type="checkbox"
        checked={showPlannedRoute}
        onChange={e => setShowPlannedRoute?.(e.target.checked)}
       />
       <span className="legend-line-sample planned" />
       <span>Planned Route</span>
      </label>
     </div>

     {/* Follow Vehicle Toggle Button */}
     <button
      type="button"
      className={`map-follow-vehicle-btn ${followVehicle ? 'is-active' : ''}`}
      onClick={() => setFollowVehicle?.(!followVehicle)}
      title="Keep vehicle centered as it moves"
     >
      <LocateFixed size={13} />
      <span>{followVehicle ? 'Following Vehicle' : 'Follow Vehicle'}</span>
     </button>

     {/* Non-blocking Connection Retry Banner */}
     {isConnectionRetrying && (
      <div className="map-retry-banner">
       <TriangleAlert size={13} />
       <span>Live connection lost. Retrying…</span>
      </div>
     )}
    </>
   )}
  </div>
 );
}

interface TripRowData {
 id: string;
 name: string;
 statusText: string;
 vehicle: string;
 vehicleDotColor: 'green' | 'red';
 timestamp: string;
 tripType: 'P' | 'D';
 statusType: 'completed' | 'upcoming' | 'failed';
 counters: number[];
}

const employeeTripsData: TripRowData[] = [
 {
  id: 'emp-11',
  name: 'Employee transport11',
  statusText: 'Completed 3h 2m ago - 2:15 PM',
  vehicle: 'MH 40 CT 1761 - Car',
  vehicleDotColor: 'green',
  timestamp: '03-01-2022 11:11:13 AM',
  tripType: 'P',
  statusType: 'completed',
  counters: [5, 2, 5, 5, 2],
 },
 {
  id: 'emp-21',
  name: 'Employee transport21',
  statusText: 'Upcoming in 2h 3m - 2:30 PM',
  vehicle: 'MH 40 CT 1761 - Travel',
  vehicleDotColor: 'red',
  timestamp: '03-01-2022 11:11:13 AM',
  tripType: 'D',
  statusType: 'upcoming',
  counters: [5, 2, 5, 5, 2],
 },
 {
  id: 'emp-0025',
  name: 'Employee transport0025',
  statusText: 'Completed 3h 2m ago - 2:15 PM',
  vehicle: 'MH 40 CT 1761 - Train',
  vehicleDotColor: 'green',
  timestamp: '03-01-2022 11:11:13 AM',
  tripType: 'P',
  statusType: 'completed',
  counters: [5, 2, 5, 5, 2],
 },
 {
  id: 'emp-678',
  name: 'Employee transport678',
  statusText: 'No point visited',
  vehicle: 'MH 40 CT 1761 - Volvo',
  vehicleDotColor: 'red',
  timestamp: '03-01-2022 11:11:13 AM',
  tripType: 'P',
  statusType: 'failed',
  counters: [5, 2, 5, 5, 2],
 },
 {
  id: 'emp-5477',
  name: 'Employee transport5477',
  statusText: 'Vehicle did not leave the location',
  vehicle: 'MH 40 CT 1761 - Car',
  vehicleDotColor: 'red',
  timestamp: '03-01-2022 11:11:13 AM',
  tripType: 'D',
  statusType: 'failed',
  counters: [5, 2, 5, 5, 2],
 },
];

function TripsLiveMap({
 isPlaying,
 selectedTripId,
}: {
 isPlaying: boolean;
 selectedTripId: string;
}) {
 const mapContainerRef = useRef<HTMLDivElement>(null);
 const mapInstanceRef = useRef<any>(null);
 const isPlayingRef = useRef(isPlaying);

 useEffect(() => {
  isPlayingRef.current = isPlaying;
 }, [isPlaying]);

 useEffect(() => {
  if (!mapContainerRef.current || mapInstanceRef.current) return;

  let animId: number;
  let isMounted = true;

  import('leaflet').then(L => {
   if (!isMounted || !mapContainerRef.current) return;

   // Google Maps centered along Valsad Civil Road corridor matching media_1791871713920.png
   const map = L.map(mapContainerRef.current, {
    center: [20.6125, 72.9318],
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
   });
   mapInstanceRef.current = map;

   (window as any).tripsMapZoomIn = () => map.zoomIn();
   (window as any).tripsMapZoomOut = () => map.zoomOut();

   L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
   }).addTo(map);

   L.control.attribution({ position: 'bottomright', prefix: 'Google Maps' }).addTo(map);

   L.polyline(valsadRoutePoints, {
    color: '#0284c7',
    weight: 8,
    opacity: 0.22,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   // Traveled route (charcoal route line with white dashed inner line)
   const traveledBaseLine = L.polyline([], {
    color: '#1e293b',
    weight: 5.5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   const traveledDashLine = L.polyline([], {
    color: '#ffffff',
    weight: 1.8,
    opacity: 0.95,
    dashArray: '5, 7',
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   // Remaining planned route (bright blue solid line)
   const remainingLine = L.polyline(valsadRoutePoints, {
    color: '#0284c7',
    weight: 4.5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin: 'round',
   }).addTo(map);

   // Stop markers: 04 (orange), 03 (green - Visited), 02 (red - Pending)
   const stops = Object.values(tripStops);
   stops.forEach(stop => {
    const pinClass = stop.color === '#ea580c' ? 'orange' : stop.color === '#16a34a' ? 'green' : 'red';
    const icon = L.divIcon({
     html: `<div class="stop-circle-pin ${pinClass}" title="${stop.name}">${stop.num}</div>`,
     className: 'custom-stop-icon',
     iconSize: [24, 24],
     iconAnchor: [12, 12],
    });

    const marker = L.marker([stop.lat, stop.lng], { icon, zIndexOffset: 400 }).addTo(map);

    if (stop.num === '03') {
     const popupHtml = `
      <div class="visited-stop-popup" style="width: 205px;">
       <div class="visited-popup-header">
        <span>Visited</span>
        <button type="button" class="visited-popup-close" onclick="this.closest('.leaflet-popup').remove()">✕</button>
       </div>
       <div class="visited-popup-tabs">
        <button type="button" class="visited-tab is-active">
         <span>Live</span>
        </button>
        <button type="button" class="visited-tab">
         <span>Employee</span>
        </button>
       </div>
       <div class="visited-popup-body">
        <div class="visited-popup-row">
         <span class="visited-popup-label">Arrival time</span>
         <span class="visited-popup-val">: 08:00 AM</span>
        </div>
        <div class="visited-popup-row">
         <span class="visited-popup-label">Departure time</span>
         <span class="visited-popup-val">: 08:05 AM</span>
        </div>
        <div class="visited-popup-row">
         <span class="visited-popup-label">Actual halt</span>
         <span class="visited-popup-val">: 00:05</span>
        </div>
        <div class="visited-popup-row">
         <span class="visited-popup-label">Position</span>
         <span class="visited-popup-val">: 125468.21, 5411245.23</span>
        </div>
        <div class="visited-popup-address">
         12-A, Wambuech Street, Boston, MA
        </div>
       </div>
      </div>
     `;

     marker.bindPopup(popupHtml, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      offset: [0, -14],
      className: 'visited-leaflet-popup',
     }).openPopup();
    }
   });

   // Realistic top-down car SVG matching screenshot
   const carSvg = `
    <svg width="22" height="42" viewBox="0 0 24 46" fill="none" style="display:block;">
     <rect x="0" y="9" width="2" height="4.5" rx="1" fill="#334155"/>
     <rect x="22" y="9" width="2" height="4.5" rx="1" fill="#334155"/>
     <rect x="0" y="31" width="2" height="4.5" rx="1" fill="#334155"/>
     <rect x="22" y="31" width="2" height="4.5" rx="1" fill="#334155"/>
     <rect x="2.5" y="1" width="19" height="43" rx="5" fill="#f8fafc" stroke="#475569" stroke-width="1.3"/>
     <path d="M 4.5 9 C 4.5 4.5 19.5 4.5 19.5 9 L 18 14 C 18 14 6 14 6 14 Z" fill="#1e293b"/>
     <rect x="5.5" y="16" width="13" height="12" rx="2" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.8"/>
     <path d="M 5.5 30 L 6.5 28 L 17.5 28 L 18.5 30 Z" fill="#1e293b"/>
     <rect x="3.5" y="42.5" width="3" height="1.5" rx="0.5" fill="#ef4444"/>
     <rect x="17.5" y="42.5" width="3" height="1.5" rx="0.5" fill="#ef4444"/>
     <rect x="3.5" y="1.5" width="2.5" height="1.5" rx="0.5" fill="#fef08a"/>
     <rect x="18" y="1.5" width="2.5" height="1.5" rx="0.5" fill="#fef08a"/>
    </svg>
   `;

   const startPt = valsadRoutePoints[0]!;
   const vehIcon = L.divIcon({
    html: `
     <div class="shuttle-map-vehicle-container" style="width: 26px; height: 46px;">
      <div id="trips-car-rotator" class="vehicle-rotator" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.45));">
       ${carSvg}
      </div>
      <div class="shuttle-live-telematics-badge" style="position: absolute; left: 30px; top: 50%; transform: translateY(-50%); pointer-events: none;">
       <span class="live-pulse-dot"></span>
       <span class="badge-veh">MH 40 CT 1761</span>
       <span class="badge-sep">•</span>
       <span class="badge-spd" id="trips-veh-spd">32 km/h</span>
      </div>
     </div>
    `,
    className: 'custom-leaflet-vehicle-icon',
    iconSize: [26, 46],
    iconAnchor: [13, 23],
   });

   const carMarker = L.marker([startPt[0], startPt[1]], { icon: vehIcon, zIndexOffset: 1000 }).addTo(map);

   // Animation loop along real road coordinates (slow and realistic)
   let progress = 0.38;
   let lastTime = performance.now();
   let haltTimer = 0;
   let hasHaltedThisCycle = false;

   const animate = (time: number) => {
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (isPlayingRef.current) {
     if (progress >= 0.52 && progress <= 0.54 && !hasHaltedThisCycle && haltTimer < 3.2) {
      haltTimer += delta;
      const spdEl = document.getElementById('trips-veh-spd');
      if (spdEl) spdEl.textContent = '0 km/h (Halt)';
      if (haltTimer >= 3.2) {
       hasHaltedThisCycle = true;
      }
     } else {
      progress = (progress + delta * 0.009) % 1;
      if (progress < 0.4) {
       hasHaltedThisCycle = false;
       haltTimer = 0;
      }

      const spdEl = document.getElementById('trips-veh-spd');
      if (spdEl) {
       const currentSpeed = Math.round(30 + Math.sin(progress * 35) * 5);
       spdEl.textContent = `${currentSpeed} km/h`;
      }
     }

     const segCount = valsadRoutePoints.length - 1;
     const segFloat = progress * segCount;
     const idx = Math.floor(segFloat);
     const t = segFloat - idx;
     const p0 = valsadRoutePoints[idx] ?? valsadRoutePoints[0]!;
     const p1 = valsadRoutePoints[idx + 1] ?? p0;

     const lat = p0[0] + (p1[0] - p0[0]) * t;
     const lng = p0[1] + (p1[1] - p0[1]) * t;
     const heading = getBearing(p0[0], p0[1], p1[0], p1[1]);

     carMarker.setLatLng([lat, lng]);

     const rotator = document.getElementById('trips-car-rotator');
     if (rotator) {
      rotator.style.transform = `rotate(${Math.round(heading)}deg)`;
     }

     const traveledSlice = valsadRoutePoints.slice(0, idx + 1);
     traveledSlice.push([lat, lng]);
     traveledBaseLine.setLatLngs(traveledSlice as any);
     traveledDashLine.setLatLngs(traveledSlice as any);

     const remainingSlice = [[lat, lng], ...valsadRoutePoints.slice(idx + 1)];
     remainingLine.setLatLngs(remainingSlice as any);
    }

    animId = requestAnimationFrame(animate);
   };

   animId = requestAnimationFrame(animate);
  });

  return () => {
   isMounted = false;
   if (animId) cancelAnimationFrame(animId);
   if (mapInstanceRef.current) {
    mapInstanceRef.current.remove();
    mapInstanceRef.current = null;
   }
  };
 }, []);

 return (
  <div
   ref={mapContainerRef}
   className="shuttle-real-map-container"
   aria-label="Real Google Maps live vehicle tracking along Valsad route"
  />
 );
}

function IconButton({icon:Icon,label,className='',onClick}:{icon:LucideIcon;label:string;className?:string;onClick?:(e: any)=>void}) {return <Button variant="legacy" className={className} title={label} aria-label={label} onClick={onClick}><Icon /></Button>;}
function InfoCard({title,rows,action,icon:Icon}:{title:string;rows:{label:string;value:string;stack?:boolean;off?:boolean}[];action:string;icon:LucideIcon}) { const [activated,setActivated]=useState(false); return <section className="info-card"><h2><Icon/>{title}</h2><div className="info-body">{rows.map(row=><div className={`info-row ${row.stack?'stack':''}`} key={row.label}><span className="info-label">{row.label}</span><span className={`info-value ${row.off?'off-road':''}`}>{row.value}</span></div>)}</div><Button variant="legacy" className="card-action" onClick={()=>{setActivated(!activated);if(action==='Share Location' && navigator.clipboard) void navigator.clipboard.writeText('35.43, -97.48');}}>{action==='Share Location'?<Share2/>:<MapPinned/>}{activated?(action==='Share Location'?'Location Copied':'Navigating'):action}</Button></section>;}

function IndeterminateCheckbox({
 checked,
 indeterminate = false,
 onChange,
 ariaLabel,
}: {
 checked: boolean;
 indeterminate?: boolean;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 ariaLabel: string;
}) {
 const ref = useRef<HTMLInputElement>(null);
 useEffect(() => {
  if (ref.current) {
   ref.current.indeterminate = Boolean(indeterminate);
  }
 }, [indeterminate]);
 return (
  <input
   ref={ref}
   type="checkbox"
   checked={checked}
   onChange={onChange}
   onClick={e => e.stopPropagation()}
   aria-label={ariaLabel}
  />
 );
}

function getStopDotClass(status: string, isLate?: boolean, isCurrent?: boolean): string {
  if (isCurrent || status === 'current') return 'current';
  if (status === 'reached_ontime') return 'ontime';
  if (status === 'reached_late') return 'late';
  if (status.startsWith('reached')) return isLate ? 'late' : 'ontime';
  if (status === 'skipped') return 'skipped';
  return 'pending';
}

function LiveTracking() {
 const [activeTab, setActiveTab] = useState<'trips' | 'shuttle' | 'object'>('shuttle');
 const [selectedTripId, setSelectedTripId] = useState<string>('emp-11');
 const [tripsSearch, setTripsSearch] = useState<string>('');
 const [isTripsPlaying, setIsTripsPlaying] = useState<boolean>(true);
 const [shuttleSearch, setShuttleSearch] = useState('');
 const [isDetailLayerOpen, setIsDetailLayerOpen] = useState(false);
 const [selectedDetailTripId, setSelectedDetailTripId] = useState('trip-1020959');
 const [isTripDetailsExpanded, setIsTripDetailsExpanded] = useState(true);
 const [expandedStopIds, setExpandedStopIds] = useState<string[]>(['stop-1']);
 const [isRemainingStopsExpanded, setIsRemainingStopsExpanded] = useState(true);
 const [isAlertExpanded, setIsAlertExpanded] = useState(false);
 const [activeSummaryFilter, setActiveSummaryFilter] = useState<string | null>(null);
 const [showActualRoute, setShowActualRoute] = useState(true);
 const [showPlannedRoute, setShowPlannedRoute] = useState(true);
 const [followVehicle, setFollowVehicle] = useState(false);
 const [isConnectionRetrying, setIsConnectionRetrying] = useState(false);
 const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);
 const [expandedRouteIds, setExpandedRouteIds] = useState<string[]>(['trip-1020959']);
 const [focusedShuttleId, setFocusedShuttleId] = useState<string>('trip-1020959');
 const [focusedVehicleId, setFocusedVehicleId] = useState<string>('veh-8993');
 const [isVehicleFocused, setIsVehicleFocused] = useState<boolean>(false);
 const [isShuttleFilterOpen, setIsShuttleFilterOpen] = useState(false);
 const [isDistanceAuditOpen, setIsDistanceAuditOpen] = useState(false);
 const [openDropdown, setOpenDropdown] = useState<'vendor' | 'office' | 'shift' | null>(null);
 const [kpiStatusFilter, setKpiStatusFilter] = useState<string | null>(null);
 const [vendorSearch, setVendorSearch] = useState('');

 useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
   if (e.key === 'Escape') {
    if (isDistanceAuditOpen) setIsDistanceAuditOpen(false);
    if (isShuttleFilterOpen) setIsShuttleFilterOpen(false);
   }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
 }, [isDistanceAuditOpen, isShuttleFilterOpen]);

 // Draft filter states (inside popup)
 const [draftVendor, setDraftVendor] = useState('All');
 const [draftOffices, setDraftOffices] = useState<string[]>([]);
 const [draftShifts, setDraftShifts] = useState<string[]>([]);
 const [draftDelayedOnly, setDraftDelayedOnly] = useState(false);

 // Applied filter states
 const [appliedVendor, setAppliedVendor] = useState('All');
 const [appliedOffices, setAppliedOffices] = useState<string[]>([]);
 const [appliedShifts, setAppliedShifts] = useState<string[]>([]);
 const [appliedDelayedOnly, setAppliedDelayedOnly] = useState(false);

 const [query,setQuery]=useState(''); 
 const [checked,setChecked]=useState<string[]>(vehicles.map(v=>v.name)); 
 const [collapsed,setCollapsed]=useState<string[]>([]); 
 const [selected,setSelected]=useState(''); 
 const [playing,setPlaying]=useState(false); 
 const [streaming,setStreaming]=useState(false); 
 const [filter,setFilter]=useState(false); 
 const [sorted,setSorted]=useState(false); 
 const [tool,setTool]=useState('');

 
 const toggle=(name:string)=>setChecked(prev=>prev.includes(name)?prev.filter(n=>n!==name):[...prev,name]);
 const toggleGroup=(group:string)=>setCollapsed(prev=>prev.includes(group)?prev.filter(g=>g!==group):[...prev,group]);

 const hasActiveFilters = appliedVendor !== 'All' || appliedOffices.length > 0 || appliedShifts.length > 0 || appliedDelayedOnly;

 const filteredShuttles = shuttleTrips.filter(s => {
  const matchesSearch =
   s.routeName.toLowerCase().includes(shuttleSearch.toLowerCase()) ||
   s.tripId.toLowerCase().includes(shuttleSearch.toLowerCase()) ||
   s.vehicles.some(v => v.vehicleNumber.toLowerCase().includes(shuttleSearch.toLowerCase()) || v.driver.toLowerCase().includes(shuttleSearch.toLowerCase()));
  if (!matchesSearch) return false;

  if (appliedVendor !== 'All' && s.vendor !== appliedVendor) return false;
  if (appliedOffices.length > 0 && !appliedOffices.includes(s.office)) return false;
  if (appliedShifts.length > 0 && !appliedShifts.includes(s.shiftChip)) return false;
  if (appliedDelayedOnly && !s.isLate) return false;
  if (kpiStatusFilter && s.status !== kpiStatusFilter) return false;

  return true;
 });

 const isAllRoutesSelected = filteredShuttles.length > 0 && selectedRouteIds.length === filteredShuttles.length;
 const isSomeRoutesSelected = selectedRouteIds.length > 0 && !isAllRoutesSelected;
 const toggleAllShuttles = () => {
  if (isAllRoutesSelected) {
   setSelectedRouteIds([]);
  } else {
   setSelectedRouteIds(filteredShuttles.map(r => r.id));
  }
 };

 const toggleRouteSelection = (routeId: string) => {
  setSelectedRouteIds(prev =>
   prev.includes(routeId) ? prev.filter(id => id !== routeId) : [...prev, routeId]
  );
 };

 const toggleRouteExpanded = (routeId: string) => {
  setExpandedRouteIds(prev =>
   prev.includes(routeId) ? prev.filter(id => id !== routeId) : [...prev, routeId]
  );
 };

 const activeShuttleTrip = shuttleTrips.find(t => t.id === focusedShuttleId) ?? shuttleTrips[0]!;
 const activeVehicle = activeShuttleTrip.vehicles.find(v => v.id === focusedVehicleId) ?? activeShuttleTrip.vehicles[0]!;

 return <main className="tracking-screen">
  <div className="map-surface">
   {activeTab === 'trips' ? (
    <TripsLiveMap
     isPlaying={isTripsPlaying}
     selectedTripId={selectedTripId}
    />
   ) : activeTab === 'shuttle' ? (
    <ShuttleRealMap
     activeTrip={activeShuttleTrip}
     isFocused={isVehicleFocused}
     onVehicleClick={() => setIsVehicleFocused(prev => !prev)}
     isDetailMode={isDetailLayerOpen}
     showActualRoute={showActualRoute}
     setShowActualRoute={setShowActualRoute}
     showPlannedRoute={showPlannedRoute}
     setShowPlannedRoute={setShowPlannedRoute}
     followVehicle={followVehicle}
     setFollowVehicle={setFollowVehicle}
     isConnectionRetrying={isConnectionRetrying}
    />
   ) : (
    <img src={mapAsset.url} alt="Road map of Oklahoma City, Midwest City and Will Rogers World Airport"/>
   )}
   <div className="map-credit">© OpenStreetMap contributors • Google Maps</div>
  </div>

  <aside className="sidebar" aria-label="Main navigation">
   <div className="logo">uffizio<sup>✦</sup></div>
   <div className="profile-line"><IconButton icon={UserRound} label="Profile"/><IconButton icon={Bell} label="Notifications"/></div>
   {[{icon:Gauge,label:'Dashboard'},{icon:MapPinned,label:'Tracking'},{icon:FileText,label:'Reports'},{icon:ChartPie,label:'Chart'},{icon:Settings,label:'Settings'}].map(({icon:Icon,label})=><Button variant="legacy" key={label} title={label} aria-label={label} aria-current={label==='Tracking'?'page':undefined} className={`side-item ${label==='Tracking'?'is-active':''}`}><Icon/><span>{label}</span></Button>)}
  </aside>

   {activeTab === 'trips' ? (
    <section className="trips-panel" aria-label="Employee Transportation Trips Panel">
     {/* 1. Header Tabs */}
     <div className="trips-tabs">
      <button
       type="button"
       className="trips-tab-btn"
       onClick={() => setActiveTab('trips')}
      >
       <RouteIcon size={14}/>
       <span>Trips</span>
      </button>
      <button
       type="button"
       className="trips-tab-icon-btn"
       title="Shuttle Tab"
       onClick={() => setActiveTab('shuttle')}
      >
       <BusFront size={14}/>
      </button>
      <button
       type="button"
       className="trips-tab-icon-btn"
       title="Drivers"
      >
       <UserRound size={14}/>
      </button>
      <button
       type="button"
       className="trips-tab-icon-btn"
       title="Grid"
      >
       <Grid3X3 size={14}/>
      </button>

      <div className="header-scope" style={{ color: '#fff', marginLeft: 'auto', marginRight: '6px' }} title="Active Scope">
       <span>Super Admin Scope</span>
       <ChevronDown size={12}/>
      </div>

      <button type="button" className="trips-tab-settings" title="Settings">
       <Settings size={15}/>
      </button>
     </div>

     {/* 2. KPI Strip (5 flat rectangular cells) */}
     <div className="trips-kpi-strip">
      <div className="trips-kpi-cell running">
       <div className="trips-kpi-top">
        <CheckCircle2 size={12}/>
        <strong>21</strong>
       </div>
       <span className="trips-kpi-label">Running</span>
      </div>
      <div className="trips-kpi-cell completed">
       <div className="trips-kpi-top">
        <Check size={12}/>
        <strong>2</strong>
       </div>
       <span className="trips-kpi-label">Completed</span>
      </div>
      <div className="trips-kpi-cell upcoming">
       <div className="trips-kpi-top">
        <Clock size={12}/>
        <strong>4</strong>
       </div>
       <span className="trips-kpi-label">Upcoming</span>
      </div>
      <div className="trips-kpi-cell fail">
       <div className="trips-kpi-top">
        <X size={12}/>
        <strong>19</strong>
       </div>
       <span className="trips-kpi-label">Failed</span>
      </div>
      <div className="trips-kpi-cell total">
       <div className="trips-kpi-top">
        <Grid3X3 size={12}/>
        <strong>48</strong>
       </div>
       <span className="trips-kpi-label">Total</span>
      </div>
     </div>

     {/* 3. Search / Toolbar */}
     <div className="trips-toolbar">
      <div className="trips-search-box">
       <input
        placeholder="Search"
        value={tripsSearch}
        onChange={e => setTripsSearch(e.target.value)}
        aria-label="Search trips"
       />
       <Search size={13} style={{ color: '#64748b' }}/>
      </div>
      <button type="button" className="trips-tool-btn" title="Refresh" onClick={() => setTripsSearch('')}>
       <RefreshCw size={13}/>
      </button>
      <button type="button" className="trips-tool-btn" title="Quick Actions">
       <Zap size={13}/>
      </button>
      <button type="button" className="trips-tool-btn" title="Filter">
       <Filter size={13}/>
      </button>
      <button type="button" className="trips-tool-btn" title="Sort">
       <ArrowDownAZ size={13}/>
      </button>
     </div>

     {/* 4. List Table Header */}
     <div className="trips-table-header">
      <span className="trips-th-trip">Trip</span>
      <span className="trips-th-vehicle">Vehicle</span>
      <div className="trips-th-actions">
       <span title="Check" style={{ color: '#16a34a', cursor: 'pointer', display: 'inline-flex' }}><Check size={12}/></span>
       <span title="Clear" style={{ color: '#dc2626', cursor: 'pointer', display: 'inline-flex' }}><X size={12}/></span>
       <span title="Edit" style={{ color: '#d97706', cursor: 'pointer', display: 'inline-flex' }}><Edit3 size={11}/></span>
       <span title="Delete" style={{ color: '#dc2626', cursor: 'pointer', display: 'inline-flex' }}><Trash2 size={11}/></span>
       <span title="Switch" style={{ color: '#0284c7', cursor: 'pointer', display: 'inline-flex' }}><ArrowLeftRight size={11}/></span>
       <span title="Collapse" style={{ color: '#64748b', cursor: 'pointer', display: 'inline-flex' }}><Minus size={12}/></span>
      </div>
     </div>

     {/* 5. Group Header */}
     <div className="trips-group-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
       <span>Company 1 (3)</span>
      </div>
      <Minus size={12} style={{ cursor: 'pointer', color: '#475569' }}/>
     </div>

     {/* 6. Trips List */}
     <div className="trips-list-container">
      {employeeTripsData
       .filter(t => t.name.toLowerCase().includes(tripsSearch.toLowerCase()) || t.vehicle.toLowerCase().includes(tripsSearch.toLowerCase()))
       .map(trip => (
        <div
         key={trip.id}
         className={`trips-row-item ${selectedTripId === trip.id ? 'is-selected' : ''}`}
         onClick={() => setSelectedTripId(trip.id)}
        >
         {/* Status Indicator Icon */}
         <div className="trips-row-status-icon">
          {trip.statusType === 'completed' && <CheckCircle2 size={14} color="#16a34a"/>}
          {trip.statusType === 'upcoming' && <Clock size={14} color="#ea580c"/>}
          {trip.statusType === 'failed' && <XCircle size={14} color="#dc2626"/>}
         </div>

         {/* Trip Column */}
         <div className="trips-row-trip-col">
          <span className="trips-row-title" title={trip.name}>{trip.name}</span>
          <span className="trips-row-subtitle">{trip.statusText}</span>
         </div>

         {/* Vehicle Column */}
         <div className="trips-row-vehicle-col">
          <span className="trips-row-veh-title">
           <span>{trip.vehicle}</span>
           <span className={`trips-row-veh-dot ${trip.vehicleDotColor}`}/>
          </span>
          <span className="trips-row-veh-date">{trip.timestamp}</span>
         </div>

         {/* Badge & Metrics */}
         <div className="trips-row-badge-col">
          <span className={`trip-type-circle-badge ${trip.tripType === 'P' ? 'pickup' : 'drop'}`}>
           {trip.tripType}
          </span>
          <div className="trips-counters">
           <span style={{ color: '#16a34a' }}>{trip.counters[0]}</span>
           <span style={{ color: '#0284c7' }}>{trip.counters[1]}</span>
           <span style={{ color: '#ea580c' }}>{trip.counters[2]}</span>
           <span style={{ color: '#dc2626' }}>{trip.counters[3]}</span>
           <span style={{ color: '#475569' }}>{trip.counters[4]}</span>
          </div>
         </div>
        </div>
       ))}
     </div>
    </section>
   ) : (
    <div className="object-panel-flip-container">
     <div className={`object-panel-flipper ${isDetailLayerOpen ? 'is-flipped' : ''}`}>
      {/* Front Face: Shuttle Listing Panel */}
      <div className="flip-front">
       <div className="object-tabs">
        <IconButton icon={MapPin} label="Locations" />
        <IconButton icon={BusFront} label="Vehicles" onClick={() => setActiveTab('trips')} />
        <IconButton icon={Fence} label="Geofence" />
        <IconButton icon={MapPinned} label="Landmarks" />
        <IconButton icon={Video} label="Video Live Stream" />
        <Button
         variant="legacy"
         className={`tab-btn ${activeTab === 'shuttle' ? 'is-active' : ''}`}
         onClick={() => setActiveTab('shuttle')}
        >
         <BusFront size={16} />
         <span>Shuttle</span>
        </Button>
       </div>

       {activeTab === 'shuttle' ? (
        <>
         <div className="kpi-strip">
          {[
           { n: shuttleTrips.filter(t => t.status === 'running').length, l: 'Running', c: 'running', icon: CheckCircle2 },
           { n: shuttleTrips.filter(t => t.status === 'completed').length, l: 'Completed', c: 'completed', icon: Check },
           { n: shuttleTrips.filter(t => t.status === 'upcoming').length, l: 'Upcoming', c: 'upcoming', icon: Clock },
           { n: shuttleTrips.filter(t => t.status === 'failed').length, l: 'Failed', c: 'failed', icon: XCircle },
           { n: shuttleTrips.length, l: 'Total', c: 'total', icon: Grid3X3 },
          ].map(k => {
           const Icon = k.icon;
           const isActive = kpiStatusFilter === k.c;
           return (
            <div
             key={k.l}
             className={`kpi ${k.c} ${isActive ? 'is-active' : ''}`}
             onClick={() => {
              if (k.c === 'total') {
               setKpiStatusFilter(null);
              } else {
               setKpiStatusFilter(prev => prev === k.c ? null : k.c);
              }
             }}
             title={`Filter by ${k.l}`}
            >
             <div className="kpi-top">
              <Icon size={13} />
              <strong>{k.n}</strong>
             </div>
             <span>{k.l}</span>
            </div>
           );
          })}
         </div>

         <div className="search-toolbar">
          <IndeterminateCheckbox
           checked={isAllRoutesSelected}
           indeterminate={isSomeRoutesSelected}
           onChange={toggleAllShuttles}
           ariaLabel="Select all shuttle routes"
          />
          <div className="search-box">
           <input placeholder="Search routes or vehicles" aria-label="Search shuttle routes and vehicles" value={shuttleSearch} onChange={e => setShuttleSearch(e.target.value)}/>
           <IconButton icon={Search} label="Search"/>
          </div>
          <IconButton icon={RefreshCw} label="Refresh" className="square-tool" onClick={() => setShuttleSearch('')}/>
          <IconButton icon={Zap} label="Quick actions" className="square-tool"/>
          <IconButton icon={Filter} label="Shuttle Filter" className={`square-tool ${(isShuttleFilterOpen || hasActiveFilters) ? 'selected' : ''}`} onClick={() => setIsShuttleFilterOpen(!isShuttleFilterOpen)}/>
          <IconButton icon={ArrowDownAZ} label="Sort vehicles" className={`square-tool ${sorted ? 'selected' : ''}`} onClick={() => setSorted(!sorted)}/>
         </div>

         <div className="group-header" style={{ justifyContent: 'space-between', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
           <IndeterminateCheckbox
            checked={isAllRoutesSelected}
            indeterminate={isSomeRoutesSelected}
            onChange={toggleAllShuttles}
            ariaLabel="Select all shuttle routes"
           />
           <span style={{ fontSize: '11px', fontWeight: 600 }}>Select All</span>
           <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{selectedRouteIds.length} selected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted-foreground)' }}>
           <span>Showing {filteredShuttles.length} of 4 routes</span>
          </div>
         </div>

         <div className="shuttle-list">
          {filteredShuttles.map(route => {
           const isExpanded = expandedRouteIds.includes(route.id);
           const isRouteSelected = selectedRouteIds.includes(route.id);
           const isRouteFocused = focusedShuttleId === route.id;

           return (
            <div key={route.id} className={`shuttle-route-group ${isRouteFocused ? 'focused' : ''}`}>
             {/* PARENT ROUTE ROW */}
             <div
              className="shuttle-route-parent-row"
              onClick={() => {
               setFocusedShuttleId(route.id);
               setSelectedDetailTripId(route.id);
               setIsVehicleFocused(true);
              }}
             >
              <div className="shuttle-parent-left">
               <button
                type="button"
                className="shuttle-chevron-btn"
                onClick={e => {
                 e.stopPropagation();
                 toggleRouteExpanded(route.id);
                }}
                aria-label={isExpanded ? `Collapse ${route.routeName}` : `Expand ${route.routeName}`}
               >
                {isExpanded ? <ChevronDown size={13}/> : <ChevronRight size={13}/>}
               </button>

               <input
                type="checkbox"
                checked={isRouteSelected}
                onChange={e => {
                 e.stopPropagation();
                 toggleRouteSelection(route.id);
                }}
                onClick={e => e.stopPropagation()}
                aria-label={`Select ${route.routeName}`}
               />

               <span className={`status-dot ${route.status === 'running' ? 'orange' : route.status === 'completed' ? 'green' : 'blue'}`}/>
              </div>

              <div className="shuttle-parent-content">
               {/* ROW 1: Route Name | Shift */}
               <div className="shuttle-line-1">
                <span
                 className="shuttle-route-title"
                 title={route.routeName}
                 onClick={e => {
                  e.stopPropagation();
                  toggleRouteExpanded(route.id);
                 }}
                >
                 {route.routeName}
                </span>
                <span className={`shuttle-shift-pill ${route.shiftType === 'IN' ? 'in' : 'out'}`}>{route.shiftChip}</span>
               </div>

               {/* ROW 2: Trip ID | Occupancy | Alert | Vehicles Count | ETA | Delay */}
               <div className="shuttle-line-2">
                <div className="shuttle-line-2-left">
                 <span
                  className="shuttle-trip-link"
                  onClick={e => {
                   e.stopPropagation();
                   setFocusedShuttleId(route.id);
                   setSelectedDetailTripId(route.id);
                   setIsVehicleFocused(true);
                   setIsDetailLayerOpen(true);
                  }}
                 >
                  {route.tripId}
                 </span>
                 <span className="shuttle-occupancy-info" title="Occupancy: Boarded(Scheduled)">
                  <Users size={11}/>
                  <span>{route.occupancy}</span>
                 </span>
                 {route.hasAlert && (
                  <span className="shuttle-alert-icon" title="Delay Alert">
                   <Flag size={10} fill="currentColor"/>
                  </span>
                 )}
                </div>
                <div className="shuttle-line-2-right">
                 <span className="shuttle-eta-val">{route.eta}</span>
                 <span className={route.isLate ? 'shuttle-delay-late' : 'shuttle-delay-ontime'}>
                  {route.delayText.replace(/[()]/g, '')}
                 </span>
                </div>
               </div>
              </div>
             </div>

             {/* CHILD VEHICLE ROWS (Shown when expanded) */}
             {isExpanded && (
              <div className="shuttle-children-container">
               {route.vehicles.map(veh => {
                const isVehFocused = focusedVehicleId === veh.id;

                return (
                 <div
                  key={veh.id}
                  className={`shuttle-vehicle-child-row ${isVehFocused ? 'focused' : ''}`}
                  onClick={() => {
                   setFocusedVehicleId(veh.id);
                   setFocusedShuttleId(route.id);
                   setSelectedDetailTripId(route.id);
                   setIsVehicleFocused(true);
                   setIsDetailLayerOpen(true);
                  }}
                 >
                  <div className="shuttle-child-left">
                   <span className={`status-dot ${veh.status === 'running' ? 'orange' : veh.status === 'completed' ? 'green' : 'blue'}`}/>
                  </div>

                  <div className="shuttle-child-content">
                   <div className="shuttle-child-meta">
                    <span className="shuttle-child-veh-num" title={veh.vehicleNumber}>
                     {veh.vehicleNumber}
                    </span>
                    <div className="shuttle-child-sub">
                     <span className="shuttle-child-driver" title={`Driver: ${veh.driver}`}>
                      <UserRound size={10}/>
                      <span>{veh.driver}</span>
                     </span>
                     <span className="shuttle-child-gps">
                      Last GPS {veh.timestamp}
                     </span>
                    </div>
                   </div>

                   <div className="vehicle-actions">
                    {[BusFront, KeyRound, Smartphone, RouteIcon, Video, ClipboardList].map((Icon, j) => {
                     const labels = ['Vehicle status', 'Ignition', 'Device', 'Route', 'Video', 'Details'];
                     const isRunning = veh.status === 'running';
                     const actionClass =
                      j === 0 ? (isRunning ? 'action-green' : 'action-blue') :
                      j === 1 ? (isRunning ? 'action-green' : '') :
                      j === 3 ? 'action-link' :
                      j === 5 ? 'action-blue' : '';

                     return (
                      <IconButton
                       key={j}
                       icon={Icon}
                       label={`${labels[j]}: ${veh.vehicleNumber}`}
                       className={actionClass}
                       onClick={(e) => {
                        e.stopPropagation();
                        if (j === 5) {
                         setFocusedVehicleId(veh.id);
                         setFocusedShuttleId(route.id);
                         setSelectedDetailTripId(route.id);
                         setIsVehicleFocused(true);
                         setIsDetailLayerOpen(true);
                        }
                       }}
                      />
                     );
                    })}
                   </div>
                  </div>
                 </div>
                );
               })}
              </div>
             )}
            </div>
           );
          })}
         </div>
        </>
       ) : (
        <>
         <div className="kpi-strip">{[{n:0,l:'Running',c:'running'},{n:0,l:'Idle',c:'idle'},{n:8,l:'Stopped',c:'stopped'},{n:94,l:'Inactive',c:'inactive'},{n:128,l:'NoData',c:'nodata'},{n:230,l:'Total',c:'total'}].map(k=><div key={k.l} className={`kpi ${k.c}`}><strong>{k.n}</strong><span>{k.l}</span></div>)}</div>
         <div className="search-toolbar"><input type="checkbox" aria-label="Select all vehicles" checked={checked.length===vehicles.length} onChange={()=>setChecked(checked.length===vehicles.length?[]:vehicles.map(v=>v.name))}/><div className="search-box"><input placeholder="Search" aria-label="Search vehicles" value={query} onChange={e=>setQuery(e.target.value)}/><IconButton icon={Search} label="Search"/></div><IconButton icon={RefreshCw} label="Refresh" className="square-tool" onClick={()=>{setQuery('');setFilter(false);}}/><IconButton icon={Zap} label="Quick actions" className="square-tool" onClick={()=>setSelected('')}/><IconButton icon={Filter} label="Filter stopped vehicles" className={`square-tool ${filter?'selected':''}`} onClick={()=>setFilter(!filter)}/><IconButton icon={ArrowDownAZ} label="Sort vehicles" className={`square-tool ${sorted?'selected':''}`} onClick={()=>setSorted(!sorted)}/></div>
         <div className="vehicle-list">{['ABC','Aarvi demo'].map(group=>{let rows=vehicles.filter(v=>v.group===group && v.name.toLowerCase().includes(query.toLowerCase()) && (!filter||v.status==='red'));if(sorted) rows=[...rows].sort((a,b)=>a.name.localeCompare(b.name));return <div key={group}><div className="group-header"><input type="checkbox" aria-label={`Select ${group}`} checked={vehicles.filter(v=>v.group===group).every(v=>checked.includes(v.name))} onChange={()=>{const names=vehicles.filter(v=>v.group===group).map(v=>v.name);setChecked(prev=>names.every(n=>prev.includes(n))?prev.filter(n=>!names.includes(n)):[...new Set([...prev,...names])]);}}/><Button variant="legacy" onClick={()=>toggleGroup(group)}>{group}<span className="group-count">[ {group==='ABC'?2:9} ]</span></Button></div>{!collapsed.includes(group)&&<><div className="group-header subgroup"><input type="checkbox" aria-label={`${group} subgroup`} defaultChecked/><span>{group}</span><span className="group-count">[ {group==='ABC'?2:9} ]</span></div>{rows.map((v,i)=><div key={v.name} className={`vehicle-row ${selected===v.name?'focused':''}`}><input type="checkbox" checked={checked.includes(v.name)} onChange={()=>toggle(v.name)} aria-label={`Select ${v.name}`}/><span className={`status-dot ${v.status}`}/><div className="vehicle-name"><Button variant="legacy" title={v.name} onClick={()=>setSelected(v.name)}>{v.name}</Button><div className="vehicle-date">{v.date}</div></div><span className="vehicle-value">{v.value}</span><div className="vehicle-actions">{[BusFront,KeyRound,Smartphone,RouteIcon,Video,Camera,Volume2,Hand,ClipboardList].map((Icon,j)=><IconButton key={j} icon={Icon} label={`${['Vehicle status','Ignition','Device','Route','Video','Camera','Audio','Command','Details'][j]}: ${v.name}`} className={j===0?(v.status==='red'||v.status==='grey'||i===0&&group==='Aarvi demo'?'action-red':'action-green'):j===1&&(v.status==='red'||i===0&&group==='Aarvi demo')?'action-red':j===3?'action-link':j===8?'action-blue':v.name.startsWith('DC4')&&(j===4||j===5||j===6)?'action-red':''} onClick={()=>setSelected(v.name)}/>)}</div></div>)}</>}</div>;})}</div>
         <div className="object-footer"><Button variant="legacy" className="stream-button" onClick={()=>setStreaming(!streaming)}><Video/>{streaming?'Stop Streaming':'Live Streaming'}</Button><select aria-label="Streaming mode" defaultValue="Single"><option>Single</option><option>Multiple</option></select></div>
        </>
       )}
      </div>

      {/* Back Face: Shuttle Trip Detail Layer (Strict 7-Step Hierarchy) */}
      <div className="flip-back" aria-label="Shuttle Trip Detail Layer">
       {/* 1. Header */}
       <div className="shuttle-detail-header">
        <button
         type="button"
         className="detail-back-btn"
         onClick={() => setIsDetailLayerOpen(false)}
         title="Back to Shuttle list"
         aria-label="Back to Shuttle list"
        >
         <ArrowLeft size={14} />
        </button>
        <span className="detail-trip-title">{activeShuttleTrip?.tripId || shuttleDetailData.tripId}</span>
        <span className={`detail-badge-direction ${shuttleDetailData.direction.toLowerCase()}`}>
         [{shuttleDetailData.direction}]
        </span>
        <span className={`detail-badge-status ${shuttleDetailData.status.toLowerCase()}`}>
         [{shuttleDetailData.status}]
        </span>
        <button
         type="button"
         className="detail-sparkle-btn"
         title="AI Route Optimization: Safety & On-time tracking active"
         onClick={() => alert("AI Route Optimization: No congestion predicted along Eastern Expressway. Estimated arrival on target.")}
        >
         <Sparkles size={13} />
        </button>
       </div>

       {/* 2. Alert Banner */}
       {shuttleDetailData.alerts.length > 0 && (
        <div
         className="shuttle-detail-alert-banner"
         onClick={() => setIsAlertExpanded(!isAlertExpanded)}
         title="Click to view alert details"
        >
         <span className="alert-banner-icon">
          <TriangleAlert size={13} />
         </span>
         <span className={`alert-banner-text ${isAlertExpanded ? 'is-expanded' : ''}`}>
          ⚠ {shuttleDetailData.alerts.join(', ')}
         </span>
         <span className="alert-banner-toggle">
          {isAlertExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
         </span>
        </div>
       )}

       {/* 3. Summary Counters Carousel */}
       <div className="detail-summary-strip-wrap">
        <button
         type="button"
         className="detail-summary-scroll-btn"
         onClick={() => {
          const el = document.getElementById('shuttle-summary-carousel');
          if (el) el.scrollBy({ left: -100, behavior: 'smooth' });
         }}
         title="Scroll left"
         aria-label="Scroll left"
        >
         <ChevronLeft size={13} />
        </button>

        <div id="shuttle-summary-carousel" className="detail-summary-carousel">
         {[
          { label: 'Total Employees', count: shuttleDetailData.summaryCounters.totalEmployees, key: 'total', colorClass: 'total' },
          { label: 'Boarded', count: shuttleDetailData.summaryCounters.boarded, key: 'boarded', colorClass: 'boarded' },
          { label: 'Not Boarded', count: shuttleDetailData.summaryCounters.notBoarded, key: 'not_boarded', colorClass: 'not_boarded' },
          { label: 'Pending Pickup', count: shuttleDetailData.summaryCounters.pendingPickup, key: 'pending', colorClass: 'pending' },
          { label: 'Women', count: shuttleDetailData.summaryCounters.women, key: 'women', colorClass: 'women' },
          { label: 'No-Show', count: shuttleDetailData.summaryCounters.noShow, key: 'noshow', colorClass: 'noshow' },
          { label: 'Cancelled', count: shuttleDetailData.summaryCounters.cancelled, key: 'cancelled', colorClass: 'cancelled' },
          { label: 'Ad-hoc', count: shuttleDetailData.summaryCounters.adHoc, key: 'adhoc', colorClass: 'adhoc' },
         ].map(chip => (
          <div
           key={chip.key}
           className={`detail-summary-chip ${chip.colorClass} ${activeSummaryFilter === chip.key ? 'is-active' : ''}`}
           onClick={() => setActiveSummaryFilter(activeSummaryFilter === chip.key ? null : chip.key)}
           title={`Filter: ${chip.label}`}
          >
           <span className="detail-summary-count">{chip.count}</span>
           <span className="detail-summary-label">{chip.label}</span>
          </div>
         ))}
        </div>

        <button
         type="button"
         className="detail-summary-scroll-btn"
         onClick={() => {
          const el = document.getElementById('shuttle-summary-carousel');
          if (el) el.scrollBy({ left: 100, behavior: 'smooth' });
         }}
         title="Scroll right"
         aria-label="Scroll right"
        >
         <ChevronRight size={13} />
        </button>
       </div>

       {/* Detail Scrollable Body */}
       <div className="shuttle-detail-body">
        {/* 4. Combined Trip Details, Driver & Vehicle Card */}
        <div className="detail-collapsible-box">
         <div
          className="detail-collapsible-header"
          onClick={() => setIsTripDetailsExpanded(!isTripDetailsExpanded)}
         >
          <span className="detail-collapsible-title">
           <span>Trip Details</span>
           {isTripDetailsExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
          <button
           type="button"
           className="detail-audit-link"
           onClick={e => {
            e.stopPropagation();
            setIsDistanceAuditOpen(true);
           }}
           title="View Distance Audit Log"
          >
           Distance Audits
          </button>
         </div>
         {isTripDetailsExpanded && (
          <div className="detail-grid-2col">
           <div className="detail-kv-item">
            <span className="detail-kv-label">Shift</span>
            <span className="detail-kv-value">{activeShuttleTrip?.shiftChip || shuttleDetailData.shift}</span>
           </div>
           <div className="detail-kv-item">
            <span className="detail-kv-label">Status</span>
            <span className="detail-kv-value" style={{ color: '#16a34a' }}>{shuttleDetailData.status}</span>
           </div>
           <div className="detail-kv-item">
            <span className="detail-kv-label">Planned</span>
            <span className="detail-kv-value">{shuttleDetailData.plannedTime}</span>
           </div>
           <div className="detail-kv-item">
            <span className="detail-kv-label">Actual</span>
            <span className="detail-kv-value">{shuttleDetailData.actualTime}</span>
           </div>
           <div className="detail-kv-item" style={{ gridColumn: 'span 2' }}>
            <span className="detail-kv-label">Vendor</span>
            <span className="detail-kv-value">{activeShuttleTrip?.vendor || shuttleDetailData.vendor}</span>
           </div>
          </div>
         )}

         {/* Driver Row with divider */}
         <div className="detail-info-strip">
          <div className="detail-strip-avatar">
           <UserRound size={14} />
          </div>
          <div className="detail-strip-main">
           <div className="detail-strip-name">
            {activeVehicle?.driver || shuttleDetailData.driver?.name || <span className="detail-not-assigned">Not assigned</span>}
           </div>
          </div>
          {shuttleDetailData.driver?.name && (
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="detail-rating-pill">
             <Star size={10} fill="#ca8a04" color="#ca8a04" />
             <span>{shuttleDetailData.driver.rating}</span>
            </span>
            <button
             type="button"
             className="detail-phone-btn"
             onClick={() => alert(`Calling driver ${shuttleDetailData.driver.name} at ${shuttleDetailData.driver.phone}...`)}
             title={`Call ${shuttleDetailData.driver.phone}`}
            >
             <Phone size={11} />
             <span>{shuttleDetailData.driver.phone}</span>
            </button>
           </div>
          )}
         </div>

         {/* Vehicle Row with divider */}
         <div className="detail-info-strip detail-vehicle-strip">
          <div className="detail-strip-icon-box">
           <BusFront size={14} />
          </div>
          <div className="detail-vehicle-content">
           <div className="detail-vehicle-main-row">
            <div className="detail-vehicle-identity">
             <span className="detail-vehicle-num">
              {activeVehicle?.vehicleNumber || shuttleDetailData.vehicle?.number || <span className="detail-not-assigned">Not assigned</span>}
             </span>
             {(activeVehicle?.vehicleNumber || shuttleDetailData.vehicle?.number) && (
              <span className="detail-vehicle-fleet">
               Fleet {activeVehicle?.vehicleNumber ? (activeVehicle.vehicleNumber.match(/\d+$/)?.[0] || shuttleDetailData.vehicle?.fleet || '8993') : (shuttleDetailData.vehicle?.fleet || '8993')}
              </span>
             )}
            </div>
            {shuttleDetailData.vehicle?.capacity && (
             <div className="detail-vehicle-attrs">
              <span className="detail-vehicle-attr-tag">{shuttleDetailData.vehicle.capacity}</span>
              {shuttleDetailData.vehicle.type && (
               <span className="detail-vehicle-attr-tag">{shuttleDetailData.vehicle.type}</span>
              )}
             </div>
            )}
           </div>
           {shuttleDetailData.vehicle?.previousNote && (
            <div className="detail-strip-note">
             {shuttleDetailData.vehicle.previousNote}
            </div>
           )}
          </div>
         </div>
        </div>

        {/* 7. Stop Timeline */}
        <div className="shuttle-stop-timeline">
         <div className="timeline-section-title">
          <span>Stop Timeline ({shuttleDetailData.stops.length} Stops)</span>
         </div>

         {/* Unified Timeline Stops (Open Always, Stop Dropdowns) */}
         <div className="timeline-stops-unified">
          {shuttleDetailData.stops.map((stop, idx) => {
           const isCurrent = stop.status === 'current' || idx === 0;
           const isExpanded = expandedStopIds.includes(stop.id);
           return (
            <div
             key={stop.id}
             className={`timeline-stop-item ${isCurrent ? 'current-stop' : ''}`}
            >
             <div
              className="stop-header-row"
              onClick={() => {
               setExpandedStopIds(prev =>
                prev.includes(stop.id) ? prev.filter(id => id !== stop.id) : [...prev, stop.id]
               );
              }}
             >
              <span className={`stop-status-dot ${getStopDotClass(stop.status, stop.isLate, isCurrent)}`} />
              <span className="stop-seq-num">{stop.num}</span>
              <span className="stop-title-text" title={stop.name}>{stop.name}</span>
              <span className="stop-employees-badge">
               <Users size={10} style={{ display: 'inline', marginRight: 3 }} />
               {stop.employeeCount}
              </span>
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
             </div>

             <div className="stop-time-grid">
              <div className="stop-time-item">
               <span>Planned:</span>
               <strong>{stop.planned}</strong>
              </div>
              <div className="stop-time-item">
               <span>{isCurrent ? 'ETA:' : 'Actual:'}</span>
               <strong>{isCurrent ? stop.etaOrActual : (stop.status.startsWith('reached') ? stop.etaOrActual : '—')}</strong>
              </div>
              {stop.delay && (
               <span
                className={
                 isCurrent
                  ? 'stop-delay-tag'
                  : stop.status === 'pending'
                  ? 'stop-pending-tag'
                  : stop.isLate
                  ? 'stop-delay-tag'
                  : 'stop-ontime-tag'
                }
               >
                {stop.delay}
               </span>
              )}
             </div>

             {/* Expanded Stop Employee List (Dropdown) */}
             {isExpanded && stop.employees && (
              <div className="stop-emp-subtable">
               {stop.employees.map((emp, empIdx) => (
                <div key={empIdx} className="stop-emp-row">
                 <span className="stop-emp-name">{emp.name}</span>
                  <span className={`stop-emp-gender ${emp.gender}`} title={emp.gender === 'female' ? 'Female' : 'Male'}>
                   {emp.gender === 'female' ? (
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="12" cy="8" r="5" />
                     <path d="M12 13v8" />
                     <path d="M9 17h6" />
                    </svg>
                   ) : (
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="10" cy="14" r="5" />
                     <path d="M19 5l-5.4 5.4" />
                     <path d="M14 5h5v5" />
                    </svg>
                   )}
                  </span>
                 <span className={`stop-emp-status ${emp.status.toLowerCase().replace(/[^a-z]/g, '')}`}>
                  {emp.status}
                 </span>
                 <span className="stop-emp-time">
                  {emp.boardingTime || '—'}
                 </span>
                 <button
                  type="button"
                  className="stop-emp-call"
                  title={`Call ${emp.name} (${emp.phone})`}
                  onClick={e => {
                   e.stopPropagation();
                   alert(`Calling employee ${emp.name} at ${emp.phone}...`);
                  }}
                  style={{ border: 'none', background: 'transparent' }}
                 >
                  <Phone size={11} />
                 </button>
                </div>
               ))}
              </div>
             )}
            </div>
           );
          })}
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Floating Playback Control */}
   <Button
    variant="legacy"
    className="playback"
    style={{ left: activeTab === 'trips' ? '50%' : activeTab === 'shuttle' ? 'calc(50% + 47px)' : '58%' }}
    onClick={() => {
     if (activeTab === 'trips') {
      setIsTripsPlaying(!isTripsPlaying);
     } else {
      setPlaying(!playing);
     }
    }}
   >
    {(activeTab === 'trips' ? isTripsPlaying : playing) ? <Pause size={13}/> : <Play size={13}/>}
    <span>{(activeTab === 'trips' ? isTripsPlaying : playing) ? 'Pause' : 'Playback'}</span>
   </Button>

   {/* Right Map Toolbar */}
   {activeTab === 'trips' ? (
    <div className="map-toolbar" style={{ right: '232px' }}>
     <IconButton icon={Search} label="Map search"/>
     <IconButton icon={Star} label="Favorites"/>
     <IconButton icon={Map} label="Map layers"/>
     <IconButton icon={RouteIcon} label="Route"/>
     <IconButton icon={LocateFixed} label="Target location"/>
     <IconButton icon={ZoomIn} label="Zoom In" onClick={() => (window as any).tripsMapZoomIn?.()}/>
     <IconButton icon={ZoomOut} label="Zoom Out" onClick={() => (window as any).tripsMapZoomOut?.()}/>
    </div>
   ) : (
    <div className="map-toolbar" style={{ right: activeTab === 'shuttle' ? '12px' : '195px' }}>
     {[{icon:Search,label:'Map search'},{icon:Star,label:'Favorites'},{icon:Map,label:'Map layers'},{icon:RouteIcon,label:'Route'},{icon:Radio,label:'Communication'},{icon:Tag,label:'Tags'},{icon:UsersRound,label:'Locations'},{icon:Scan,label:'Select area'},{icon:MapPin,label:'Map marker'},{icon:Crosshair,label:'Center map'}].map(t=><IconButton key={t.label} icon={t.icon} label={t.label} className={tool===t.label?'selected':''} onClick={()=>setTool(tool===t.label?'':t.label)}/>)}
    </div>
   )}

   {/* Right-Side Panels */}
   {activeTab === 'trips' ? (
    <aside className="trips-right-panel" aria-label="Trip Information and Statistics">
     {/* Widget A: Trip Info */}
     <div className="trips-widget-card">
      <div className="trips-widget-header">
       <span className="trips-widget-title">Trip Info</span>
       <span className="status-chip completed">Completed</span>
      </div>
      <div className="trips-widget-body">
       <div className="trips-kv-row">
        <span className="trips-kv-label">Trip name</span>
        <span className="trips-kv-value">11111</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">Trip type</span>
        <span className="trips-kv-value">Drop</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">EST start</span>
        <span className="trips-kv-value">00:45 hrs</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">Trip Duration</span>
        <span className="trips-kv-value">00:45 hrs</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">Total Trip Distance</span>
        <span className="trips-kv-value">12 km</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">Trip Distance</span>
        <span className="trips-kv-value">20 km</span>
       </div>
       <div className="trips-kv-row">
        <span className="trips-kv-label">Validity</span>
        <span className="trips-kv-value">03:00 PM</span>
       </div>
       <button type="button" className="trips-widget-link-btn">
        <Play size={10} fill="currentColor"/>
        <span>Show Checkpoint List</span>
       </button>
      </div>
     </div>

     {/* Widget B: Employee Attendance */}
     <div className="trips-widget-card">
      <div className="trips-widget-header">
       <span className="trips-widget-title">Employee Attendance</span>
      </div>
      <div className="trips-widget-body">
       <div className="attendance-chart-wrap">
        <div style={{ position: 'relative', width: 68, height: 68 }}>
         <svg width="68" height="68" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4"/>
          <circle
           cx="18"
           cy="18"
           r="14"
           fill="none"
           stroke="#16a34a"
           strokeWidth="4"
           strokeDasharray="81.6 88"
           strokeDashoffset="22"
          />
          <circle
           cx="18"
           cy="18"
           r="14"
           fill="none"
           stroke="#dc2626"
           strokeWidth="4"
           strokeDasharray="6.4 88"
           strokeDashoffset="28.4"
          />
         </svg>
         <div
          style={{
           position: 'absolute',
           inset: 0,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           textAlign: 'center',
           lineHeight: 1.1,
          }}
         >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>140</span>
          <span style={{ fontSize: 7.5, color: '#64748b' }}>Employees</span>
         </div>
        </div>

        <div className="attendance-legend">
         <div className="attendance-legend-item">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }}/>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
           <span style={{ fontSize: 9, color: '#64748b' }}>Present</span>
           <span style={{ color: '#16a34a', fontWeight: 700 }}>130</span>
          </div>
         </div>
         <div className="attendance-legend-item">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626' }}/>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
           <span style={{ fontSize: 9, color: '#64748b' }}>Absent</span>
           <span style={{ color: '#dc2626', fontWeight: 700 }}>10</span>
          </div>
         </div>
        </div>
       </div>

       <button type="button" className="trips-widget-link-btn">
        <Users size={11}/>
        <span>Show Employees List</span>
       </button>
      </div>
     </div>

     {/* Widget C: Number of trips */}
     <div className="trips-widget-card">
      <div className="trips-widget-header">
       <span className="trips-widget-title">Number of trips</span>
       <span style={{ fontSize: 10, fontWeight: 700, color: '#0284c7' }}>3</span>
      </div>
      <div className="trips-widget-body" style={{ padding: '6px 7px' }}>
       {/* Trip 1 */}
       <div className="trip-summary-block">
        <div className="trip-summary-top">
         <span className="trip-summary-name">S1 - School BU</span>
         <span className="trip-type-pill drop">Drop</span>
        </div>
        <div className="trip-summary-status completed">Completed</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#64748b', marginBottom: 2 }}>
         <span>Start</span>
         <span>End</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#0284c7', fontSize: '8px' }}>••• EST •••</span>
         <span>08:45 AM</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600, marginTop: 2 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#16a34a', fontSize: '8px' }}>••• ACT •••</span>
         <span>-</span>
        </div>
       </div>

       {/* Trip 2 */}
       <div className="trip-summary-block">
        <div className="trip-summary-top">
         <span className="trip-summary-name">S1 - School BU</span>
         <span className="trip-type-pill pickup">Pickup</span>
        </div>
        <div className="trip-summary-status running">Running</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#64748b', marginBottom: 2 }}>
         <span>Start</span>
         <span>End</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#0284c7', fontSize: '8px' }}>••• EST •••</span>
         <span>08:45 AM</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600, marginTop: 2 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#16a34a', fontSize: '8px' }}>••• ACT •••</span>
         <span>-</span>
        </div>
       </div>

       {/* Trip 3 */}
       <div className="trip-summary-block">
        <div className="trip-summary-top">
         <span className="trip-summary-name">S1 - School BU</span>
         <span className="trip-type-pill pickup">Pickup</span>
        </div>
        <div className="trip-summary-status force">Forcefully completed</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#64748b', marginBottom: 2 }}>
         <span>Start</span>
         <span>End</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#0284c7', fontSize: '8px' }}>••• EST •••</span>
         <span>08:45 AM</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: '#1e293b', fontWeight: 600, marginTop: 2 }}>
         <span>08:00 AM</span>
         <span style={{ color: '#dc2626', fontSize: '8px' }}>••• ACT •••</span>
         <span>-</span>
        </div>
       </div>
      </div>
     </div>
    </aside>
   ) : activeTab === 'object' ? (
    <aside className="info-column"><div className="info-heading"><IconButton icon={MapPinned} label="Location information"/><IconButton icon={Settings} label="Information settings"/></div><InfoCard title="Ambulance Info" icon={Smartphone} action="Share Location" rows={[{label:'Ambulance No',value:'GJ15CF1234'},{label:'Job Id',value:'N/A'},{label:'Status',value:'Available'},{label:'Last Activity',value:'20-07-2026 05:10:00 PM'},{label:'Road Status',value:'Off Road',off:true},{label:'State Code',value:'MP'},{label:'GPS Status',value:'1'},{label:'GPS Time',value:'20-07-2026 05:10:00 PM'}]}/><InfoCard title="Caller Info" icon={Smartphone} action="Navigate" rows={[{label:'Caller Location',value:'Punasa, Khandwa District',stack:true},{label:'Caller Coords',value:'35.43, -97.48'},{label:'Contact',value:'NA'},{label:'Dist/ETA(V-V)',value:'31.19 km'}]}/><InfoCard title="Hospital Info" icon={Smartphone} action="Navigate" rows={[{label:'Hospital Location',value:'Punasa, Khandwa District',stack:true},{label:'Hospital Coords',value:'35.41, -97.46'},{label:'Dist/ETA(C-H)',value:'0.58 km'},{label:'Total Est Dist',value:'31.77 km'}]}/></aside>
   ) : null}

   {activeTab === 'object' && (
    <div className="map-object"><CircleUserRound/></div>
   )}

   {activeTab === 'object' && (
    <div className="bottom-scores" style={{ left: '58%' }}><div className="score safety"><ShieldCheck/><span>Safety</span><strong>85</strong></div><div className="score efficiency"><Timer/><span>Efficiency</span><strong>72</strong></div><div className="score risk"><TriangleAlert/><span>Risk</span><strong>15</strong></div><div className="score discipline"><ThumbsUp/><span>Discipline</span><strong>98</strong></div></div>
   )}

  {isShuttleFilterOpen && (
   <div className="shuttle-filter-overlay" onClick={() => { setIsShuttleFilterOpen(false); setOpenDropdown(null); }}>
    <div className="shuttle-filter-modal" onClick={e => e.stopPropagation()}>
     <div className="shuttle-filter-header">
      <span className="shuttle-filter-header-title">Shuttle Filter</span>
      <button
       type="button"
       className="shuttle-filter-close"
       onClick={() => { setIsShuttleFilterOpen(false); setOpenDropdown(null); }}
       aria-label="Close Shuttle Filter"
       title="Close"
      >
       <X/>
      </button>
     </div>

     <div className="shuttle-filter-body">
      {/* 1. Vendor */}
      <div className="shuttle-filter-field">
       <label className="shuttle-filter-label">Vendor</label>
       <div style={{ position: 'relative' }}>
        <button
         type="button"
         className={`shuttle-dropdown-trigger ${openDropdown === 'vendor' ? 'is-open' : ''}`}
         onClick={() => setOpenDropdown(openDropdown === 'vendor' ? null : 'vendor')}
        >
         <span>{draftVendor}</span>
         <ChevronDown/>
        </button>
        {openDropdown === 'vendor' && (
         <div className="shuttle-dropdown-menu">
          <div className="shuttle-dropdown-search">
           <input
            placeholder="Search vendor..."
            value={vendorSearch}
            onChange={e => setVendorSearch(e.target.value)}
            autoFocus
           />
          </div>
          {shuttleVendors
           .filter(v => v.toLowerCase().includes(vendorSearch.toLowerCase()))
           .map(v => (
            <div
             key={v}
             className={`shuttle-dropdown-item ${draftVendor === v ? 'is-selected' : ''}`}
             onClick={() => { setDraftVendor(v); setOpenDropdown(null); }}
            >
             <span>{v}</span>
            </div>
           ))}
         </div>
        )}
       </div>
      </div>

      {/* 2. Office */}
      <div className="shuttle-filter-field">
       <label className="shuttle-filter-label">Office</label>
       <div style={{ position: 'relative' }}>
        <button
         type="button"
         className={`shuttle-dropdown-trigger ${openDropdown === 'office' ? 'is-open' : ''}`}
         onClick={() => setOpenDropdown(openDropdown === 'office' ? null : 'office')}
        >
         <span>
          {draftOffices.length === 0 || draftOffices.length === shuttleOffices.length
           ? 'All'
           : draftOffices.length === 1
           ? draftOffices[0]
           : `${draftOffices.length} selected`}
         </span>
         <ChevronDown/>
        </button>
        {openDropdown === 'office' && (
         <div className="shuttle-dropdown-menu">
          <div
           className="shuttle-dropdown-item"
           style={{ fontWeight: 600, borderBottom: '1px solid var(--muted)' }}
           onClick={() => setDraftOffices([])}
          >
           <input
            type="checkbox"
            checked={draftOffices.length === 0 || draftOffices.length === shuttleOffices.length}
            onChange={() => {}}
           />
           <span>All</span>
          </div>
          {shuttleOffices.map(off => {
           const isChecked = draftOffices.includes(off);
           return (
            <div
             key={off}
             className={`shuttle-dropdown-item ${isChecked ? 'is-selected' : ''}`}
             onClick={() => {
              setDraftOffices(prev =>
               prev.includes(off) ? prev.filter(x => x !== off) : [...prev, off]
              );
             }}
            >
             <input type="checkbox" checked={isChecked} onChange={() => {}}/>
             <span>{off}</span>
            </div>
           );
          })}
         </div>
        )}
       </div>
      </div>

      {/* 3. Shift */}
      <div className="shuttle-filter-field">
       <label className="shuttle-filter-label">Shift</label>
       <div style={{ position: 'relative' }}>
        <button
         type="button"
         className={`shuttle-dropdown-trigger ${openDropdown === 'shift' ? 'is-open' : ''}`}
         onClick={() => setOpenDropdown(openDropdown === 'shift' ? null : 'shift')}
        >
         <span>
          {draftShifts.length === 0 || draftShifts.length === shuttleShifts.length
           ? 'All'
           : draftShifts.length === 1
           ? draftShifts[0]
           : `${draftShifts.length} selected`}
         </span>
         <ChevronDown/>
        </button>
        {openDropdown === 'shift' && (
         <div className="shuttle-dropdown-menu">
          <div
           className="shuttle-dropdown-item"
           style={{ fontWeight: 600, borderBottom: '1px solid var(--muted)' }}
           onClick={() => setDraftShifts([])}
          >
           <input
            type="checkbox"
            checked={draftShifts.length === 0 || draftShifts.length === shuttleShifts.length}
            onChange={() => {}}
           />
           <span>All</span>
          </div>
          {shuttleShifts.map(sh => {
           const isChecked = draftShifts.includes(sh);
           return (
            <div
             key={sh}
             className={`shuttle-dropdown-item ${isChecked ? 'is-selected' : ''}`}
             onClick={() => {
              setDraftShifts(prev =>
               prev.includes(sh) ? prev.filter(x => x !== sh) : [...prev, sh]
              );
             }}
            >
             <input type="checkbox" checked={isChecked} onChange={() => {}}/>
             <span>{sh}</span>
            </div>
           );
          })}
         </div>
        )}
       </div>
      </div>

      {/* 4. Delayed Trips */}
      <div className="shuttle-filter-field">
       <label className="shuttle-filter-label">Delayed Trips</label>
       <label className="shuttle-checkbox-row">
        <input
         type="checkbox"
         checked={draftDelayedOnly}
         onChange={e => setDraftDelayedOnly(e.target.checked)}
        />
        <span>Show delayed trips only</span>
       </label>
      </div>
     </div>

     <div className="shuttle-filter-footer">
      <button
       type="button"
       className="btn-filter-secondary"
       onClick={() => {
        setDraftVendor('All');
        setDraftOffices([]);
        setDraftShifts([]);
        setDraftDelayedOnly(false);
        setAppliedVendor('All');
        setAppliedOffices([]);
        setAppliedShifts([]);
        setAppliedDelayedOnly(false);
        setOpenDropdown(null);
       }}
      >
       Clear All
      </button>
      <button
       type="button"
       className="btn-filter-primary"
       onClick={() => {
        setAppliedVendor(draftVendor);
        setAppliedOffices([...draftOffices]);
        setAppliedShifts([...draftShifts]);
        setAppliedDelayedOnly(draftDelayedOnly);
        setIsShuttleFilterOpen(false);
        setOpenDropdown(null);
       }}
      >
       Apply
      </button>
     </div>
    </div>
   </div>
  )}

  {/* Distance Audit Log Modal (Trackzee / Uffizio Enterprise UI) */}
  {isDistanceAuditOpen && (
   <div
    className="audit-modal-overlay"
    onClick={() => setIsDistanceAuditOpen(false)}
    role="dialog"
    aria-modal="true"
    aria-labelledby="audit-modal-title"
   >
    <div
     className="audit-modal-container"
     onClick={e => e.stopPropagation()}
    >
     {/* 1. Header */}
     <div className="audit-modal-header">
      <div className="audit-modal-header-text">
       <span id="audit-modal-title" className="audit-modal-title">Distance Audit Log</span>
       <span className="audit-modal-subtitle">
        Trip #{activeShuttleTrip?.tripId ? activeShuttleTrip.tripId.replace(/^[Tt]rip-?/, '') : '1020959'}
       </span>
      </div>
      <button
       type="button"
       className="audit-modal-close"
       onClick={() => setIsDistanceAuditOpen(false)}
       title="Close"
       aria-label="Close"
      >
       <X size={15} />
      </button>
     </div>

     {/* 2. Body */}
     <div className="audit-modal-body">
      {/* Row 1: Planned Map Distance */}
      <div className="audit-modal-row">
       <span className="audit-row-label">Planned Map Distance</span>
       <span className="audit-row-value">28.4 km</span>
      </div>

      {/* Row 2: Actual GPS Odometer Distance */}
      <div className="audit-modal-row">
       <span className="audit-row-label">Actual GPS Odometer Distance</span>
       <span className="audit-row-value">29.1 km</span>
      </div>

      {/* Row 3: Variance / Deviation */}
      <div className="audit-modal-row audit-row-highlight">
       <span className="audit-row-label audit-label-strong">Variance / Deviation</span>
       <div className="audit-row-value-group">
        <span className="audit-variance-value is-within">+0.7 km</span>
        <span className="audit-status-badge status-within">Within Policy Limit</span>
       </div>
      </div>
     </div>

     {/* 3. Footer */}
     <div className="audit-modal-footer">
      <button
       type="button"
       className="audit-btn-close"
       onClick={() => setIsDistanceAuditOpen(false)}
      >
       Close
      </button>
     </div>
    </div>
   </div>
  )}
 </main>;
}

