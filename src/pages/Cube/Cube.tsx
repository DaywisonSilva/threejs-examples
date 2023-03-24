import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'

const Cube = () => {
  const containerCube = useRef<HTMLDivElement>(null)

  const render = () => {
    // create scene
    const scene = new THREE.Scene()
    const width = window.document.body.clientWidth
    const height = window.document.body.scrollHeight

    // set camera perspective
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    // render scene
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerCube.current?.appendChild(renderer.domElement)

    // create element
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    // add to scene the element created
    /**
     * By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0)
     */
    scene.add(cube)

    // set camera position
    camera.position.z = 5

    // rendering the scene
    function animate() {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  }

  useEffect(() => {
    render()
  }, [])

  return <div ref={containerCube}></div>
}

export default Cube
