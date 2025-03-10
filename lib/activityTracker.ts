import { nanoid } from 'nanoid';

interface UserActivity {
  eventType: 'pageview' | 'click' | 'scroll' | 'search' | 'product_view';
  timestamp: number;
  sessionId: string;
  path: string;
  data?: Record<string, any>;
}

class ActivityTracker {
  private sessionId: string = nanoid();
  private activities: UserActivity[] = [];
  private batchSize: number = 10;
  private initialized: boolean = false;



  public initialize() {
    if (!this.initialized) {
      this.setupPageViewTracking();
      this.setupClickTracking();
      this.setupScrollTracking();
      this.initialized = true;
    }
  }
  

  private setupPageViewTracking() {
    this.trackPageView(window.location.pathname);
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });
  }

 private setupClickTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const x = e.pageX;
    const y = e.pageY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    this.trackClick({
      elementId: target.id,
      elementClass: target.className,
      elementText: target.textContent || '',
      x,
      y,
      relativeX: (x / viewportWidth) * 100,
      relativeY: (y / viewportHeight) * 100
    });
  });
}


  private setupScrollTracking() {
    let timeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const scrollDepth = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        this.trackScroll(scrollDepth);
      }, 100);
    });
  }

  private async sendActivities() {
    if (this.activities.length >= this.batchSize) {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token') || '',
          },
          body: JSON.stringify({ activities: this.activities }),
        });
        this.activities = [];
      } catch (error) {
        console.error('Failed to send activities:', error);
      }
    }
  }

  public trackPageView(path: string) {
    this.addActivity({
      eventType: 'pageview',
      path,
    });
  }
// Add this method to the ActivityTracker class
public trackClickPosition(e: MouseEvent) {
  const x = e.pageX;
  const y = e.pageY;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  this.addActivity({
    eventType: 'click',
    path: window.location.pathname,
    data: {
      x,
      y,
      relativeX: (x / viewportWidth) * 100,
      relativeY: (y / viewportHeight) * 100,
      elementType: (e.target as HTMLElement).tagName.toLowerCase(),
    }
  });
}

  public trackClick(data: Record<string, any>) {
    this.addActivity({
      eventType: 'click',
      path: window.location.pathname,
      data,
    });
  }

  public trackScroll(scrollDepth: number) {
    this.addActivity({
      eventType: 'scroll',
      path: window.location.pathname,
      data: { scrollDepth },
    });
  }

  private addActivity(activity: Omit<UserActivity, 'timestamp' | 'sessionId'>) {
    const fullActivity = {
      ...activity,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };
    
    console.log('New activity:', {
      type: fullActivity.eventType,
      path: fullActivity.path,
      data: fullActivity.data,
      timestamp: new Date(fullActivity.timestamp).toLocaleString(),
      sessionId: fullActivity.sessionId
    });
    
    this.activities.push(fullActivity);
    
    console.log('Current batch size:', this.activities.length);
    if (this.activities.length >= this.batchSize) {
      console.log('Batch full, sending activities...');
      this.sendActivities();
    }
  }
  
}

export const activityTracker = new ActivityTracker();
