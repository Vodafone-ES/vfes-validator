// export default email => /^[^\(\)\<\>\@\,\;\:\"\[\]\ç\%\&]+[@][a-zA-Z0-9\.]+$/g.test(email);

export default email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
