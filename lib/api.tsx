export const sendContactForm = async (data: any) => fetch('/api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
});