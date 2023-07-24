import { FC } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
import { Position } from 'reactflow';

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

  return (
    <>
        <BaseEdge path={edgePath} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-150%, -50%) translate(${sourceX}px,${sourceY}px)`,
            background: '#fff',
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop:5,
            paddingBottom:5,
            borderRadius: 5,
            border: '1px solid black',
            fontSize: 12,
            fontWeight: 700,
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