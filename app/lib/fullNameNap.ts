/**
 * JFC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "JFC01",
  "fullName": "Jane Finch Cannabis Dispensary Weed Delivery",
  "street": "2728 Jane St",
  "city": "North York",
  "region": "ON",
  "postal": "M3L 2G6",
  "phoneDisplay": "(437) 524-9336",
  "phoneTel": "tel:+14375249336",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJFwvOiwUxK4gReheHHQyoBWE",
  "placeId": "ChIJFwvOiwUxK4gReheHHQyoBWE",
  "neighbourhood": "Jane and Finch / North York",
  "intersection": "Jane St & Sheppard Ave W",
  "transit": "Accessible via local TTC bus routes on Jane Street and Finch Avenue.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
