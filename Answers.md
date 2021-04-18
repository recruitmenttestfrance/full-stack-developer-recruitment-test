# Questions

### How long did you spend on the backend coding test?

2-3 hours at most

### What would you add to your solution if you had more time?

Proper testing especially on corner cases like months with 28 days and such. I'm pretty sure the result I have right now, is far from being free of bugs.

### What would've been your architecture choice for this kind of application without our example?

I'm not as experienced with backend as I am with frontend. However I would have probably started to split the slot generation part. Right now it is pretty much contained only in the Location class.

### How can you handle post midnight cases to be displayed on the same day and not the next one?

With the way I have made my code, I think it could work by simply extending the time ranges. For example by providing ranges that when we sumup end up with more than 24h for a single day.

### How long did you spend on the frontend coding test?

Roughly 5-6 hours.

### What were your biggest difficulties?

Making sure the layout was as close as possible to the screenshot. I ended going on eva.gg to find out what was the font you are usually using. Also I'm very not happy with the way I handled the passing of data between the components. It actually slowed me down quite a lot. I would have probably used something like redux if I were to do it again.

### How would you track down a performance issue in production?

I usually track it down with either puppeteer or jest and simply track down the time it takes to go to a fully loaded page, or time it takes to see a specific component appear.
Other than that, chrome dev tools is always my go to.

### Have you ever had to do this?

Rarely. The major performance issues I encounter are usually already very distinct while developing. So they don't appear in production.

# Bonus questions

### How are you feeling about our game and locations?

I haven't had the chance to try them out but looking at the videos I can telle this looks very qualitative. I can't wait to try it out in Toulouse.

### Are you a gamer? Which games do you play?

Not as much as I used to. The only games I have time for these days are beat saber or small exploration games like "Moss" or "Star Wars: Tales from the galaxy's edge".

### Do you know livestreaming? RTMP?

I know about rtsp for security cameras. Haven't tried out RTMP.
