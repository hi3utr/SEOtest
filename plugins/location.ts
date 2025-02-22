// plugins/location.ts

export default defineNuxtPlugin((nuxtApp: any) => {
  const apiKey = 'c4180199f01942df950ab39647460152'; // Replace with your actual API key

  const redirectToHomepage = async () => {
    // Check if we have a cached locale
    const cachedLocale = localStorage.getItem('userLocale');
    if (cachedLocale) {
      nuxtApp.$router.push(cachedLocale === 'en' ? '/' : `/${cachedLocale}`);
      return;
    }

    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch IP location');
      }
      const data = await response.json();
      const countryCode: string = data.country_code2; // Use the 2-letter country code

      // Map country codes to locale codes
      const countryToLocale: Record<string, string> = {
        US: 'en',
        GB: 'en',
        KR: 'ko',
        JP: 'ja',
        CN: 'zh',
        TW: 'zh',
      };

      const locale = countryToLocale[countryCode] || 'en';
      localStorage.setItem('userLocale', locale); // Cache the locale
      const path = locale === 'en' ? '/' : `/${locale}`;
      nuxtApp.$router.push(path);
    } catch (error) {
      console.error('Error detecting location:', error);
      // Fallback to default locale
      nuxtApp.$router.push('/');
    }
  };

  nuxtApp.hook('app:mounted', redirectToHomepage);
});

// plugins/location.ts

// export default defineNuxtPlugin((nuxtApp: any) => {
//   // Function to get user's location
//   const getUserLocation = (): Promise<GeolocationCoordinates> => {
//     return new Promise((resolve, reject) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             resolve(position.coords);
//           },
//           (error) => {
//             reject(error);
//           },
//         );
//       } else {
//         reject(new Error('Geolocation is not supported by this browser.'));
//       }
//     });
//   };

//   // Function to redirect based on location
//   const redirectToHomepage = async () => {
//     try {
//       const coords = await getUserLocation();
//       const response = await fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
//       );
//       const data = await response.json();
//       const countryCode: string = data.countryCode;

//       // Redirect based on country code
//       switch (countryCode) {
//         case 'US':
//           nuxtApp.$router.push('/us-home'); // Example route for US
//           break;
//         case 'KR':
//           nuxtApp.$router.push('/kr-home'); // Example route for South Korea
//           break;
//         case 'JP':
//           nuxtApp.$router.push('/jp-home'); // Example route for Japan
//           break;
//         case 'CN':
//           nuxtApp.$router.push('/cn-home'); // Example route for China
//           break;
//         default:
//           nuxtApp.$router.push('/'); // Default route
//       }
//     } catch (error) {
//       console.error('Error getting location:', error);
//     }
//   };

//   // Call the redirect function on app mount
//   nuxtApp.hook('app:mounted', redirectToHomepage);
// });
