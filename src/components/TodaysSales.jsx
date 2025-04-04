
const TodaysSales = () => {
    const [timeLeft, setTimeLeft] = useState(saleEndTime - new Date().getTime()); // 1 hour countdown

    // Countdown timer functionality
  
    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = saleEndTime - new Date().getTime();
            if (remaining <= 0) {
                clearInterval(timer);
                setTimeLeft(0);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);


  // Convert seconds into HH:MM:SS format
  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
};

  return (
    <div className="w-[100%] h-[350px] border">
       <div className="" id="inner">
            <div>
                <h3>Todays</h3>
            </div>
            <div className="flex ">
                <h2>Flash Sales</h2>
                <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold", color: "red" }}>
                     Flash Sale Ends In: {formatTime(timeLeft)}
                </div>

            </div>
        </div>
    </div>
  )
}

export default TodaysSales