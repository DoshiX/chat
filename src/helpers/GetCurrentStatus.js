const getCurrentStatus = ({ status, last_seen_date }) => {
	if (status === 'online') 
		return 'В сети';
  
	const dateNow = Date.now();
	const lastSeenDateMilliseconds = new Date(last_seen_date).getTime();
  
	const dateDelta = Math.trunc(dateNow - lastSeenDateMilliseconds);
  
	const minutes = Math.trunc(dateDelta / 1000 / 60);
  
	let hours = null;
	let days = null;
  
	if (minutes < 1) 
		return 'Недавно был в сети';
  
	if (minutes >= 60) 
		hours = Math.trunc(minutes / 60);
  
	if (hours >= 24) 
		days = Math.trunc(hours / 24);
  
	if (days) 
		return `Был в сети ${days} ${_decOfNum(days, ['день', 'дня', 'дней'])} назад`;
      
	if (hours) 
		return `Был в сети ${hours} ${_decOfNum(hours, ['час', 'часа', 'часов'])} назад`;
  
	return `Был в сети ${minutes} ${_decOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
};

const _decOfNum = (number, titles) => {
	let decCache = [],
		decCases = [2, 0, 1, 1, 1, 2];
  
	if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]; 
  
	return titles[decCache[number]];
};

export default getCurrentStatus;
