import { useGLTF } from "@react-three/drei";


export function Computer(props) {
    const { nodes, materials } = useGLTF(
        "public/models/computer-optimized-transformed.glb"
    );

    return (
        <group {...props} dispose={null}>
            <group position={[0, 0,0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
                    material={materials["ComputerDesk.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
                    material={materials["FloppyDisk.001"]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("public/models/computer-optimized-transformed.glb");

export default Computer;