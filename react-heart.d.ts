declare module 'react-heart' {
    export interface HeartProps {
      // Define your component's props
        isActive?: any;	
        onClick?: any;	
        animationTrigger?: any;	
        animationScale?: any;	
        animationDuration?: any;		
        inactiveColor?: any;	
        activeColor?: any;	
        className?: any;		
        style?: any;	
    }
  
    const Heart: React.FC<HeartProps>;
  
    export default Heart;
}