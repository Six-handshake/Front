import { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

const PercentContainer: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const translate = data.betweenDeep 
  ? `translate(30%, -50%) translate(${targetX}px,${targetY}px)` 
  : `translate(-150%, -50%) translate(${sourceX}px,${sourceY}px)`;
  // const translate = data.betweenDeep 
  // ? `translate(30%, -50%) translate(${targetX}px,${targetY}px)` 
  // : `translate(-150%, -50%) translate(${sourceX}px,${sourceY}px)`;

  return (
    <>
        <BaseEdge path={edgePath} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `${translate}`,
            background: '#fff',
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop:5,
            paddingBottom:5,
            borderRadius: 5,
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '2px solid yellow',
            fontSize: 12,
            fontWeight: 700,
            width: '45px'
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export {PercentContainer};