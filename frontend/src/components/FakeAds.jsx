function FakeAds() {
  const ads = [
    "DOWNLOAD MORE RAM",
    "YOU WON ₹5000",
    "FREE GOVERNMENT WIFI",
    "CLICK HERE FOR VIRUS"
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">

      {ads.map((ad,index) => (
        <div key={index} className="absolute bg-yellow-400 text-black px-4 py-2 font-bold animate-bounce"
          style={{
            top:`${Math.random() * 90}%`,
            left:`${Math.random() * 90}%`
          }}
        >
          {ad}
        </div>
      ))}
    </div>
  )
}

export default FakeAds