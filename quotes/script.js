function getQuote() {
  var quotes = []
  quotes[0] = "The things you own end up owning you.";
  quotes[1] = "It's only after we've lost everything that we're free to do anything. ";
  quotes[2] = "This is your life and it's ending one minute at a time.";
  quotes[3] = "On a long enough timeline, the survival rate for everyone drops to zero. ";
  quotes[4] = "I am Jack's smirking revenge.";
  var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").innerHTML=randomQuote;
}