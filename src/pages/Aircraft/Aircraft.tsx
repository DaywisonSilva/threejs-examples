import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { AnimationMixer } from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

import Stats from 'three/examples/jsm/libs/stats.module'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import aircraftGlb from '../../assets/aircraft.glb'

const Aircraft = () => {
  const container = useRef<HTMLDivElement>(null)

  const render = () => {
    let mixer: AnimationMixer

    const clock = new THREE.Clock()

    const stats = Stats()
    container?.current?.appendChild(stats.dom)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    container?.current?.appendChild(renderer.domElement)

    const pmremGenerator = new THREE.PMREMGenerator(renderer)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe3dd)
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      100
    )
    camera.position.set(5, 2, 8)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.5, 0)
    controls.update()
    controls.enablePan = false
    controls.enableDamping = true

    const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath('jsm/libs/draco/gltf/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load(
      aircraftGlb,
      function (gltf) {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(0.1, 0.1, 0.1)
        scene.add(model)

        mixer = new THREE.AnimationMixer(model)
        // mixer.clipAction(gltf.animations[0]).play()

        animate()
      },
      undefined,
      function (e) {
        console.error(e)
      }
    )

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      requestAnimationFrame(animate)

      const delta = clock.getDelta()

      mixer.update(delta)

      controls.update()

      stats.update()

      renderer.render(scene, camera)
    }
  }

  useEffect(() => {
    render()
  }, [])

  return <div ref={container}></div>
}

export default Aircraft
