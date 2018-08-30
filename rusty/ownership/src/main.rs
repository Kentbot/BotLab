fn main() {
    let first_circle = Circle { radius: 5.0, center_x: 100, center_y: 200 };
    let c = Circle { radius: 10.0, ..first_circle };
    let t = Triangle { base: 2.0, height: 1.0 };

    // println!("Area of my circle: {}", area_of_circle(&c));
    println!("Area of my circle: {}", c.area());
    // println!("Area of my triangle: {}", area_of_triangle(&t));
    println!("Area of my triangle: {}", t.area());

    // Uses derive(Debug) to enable debug info to stdout
    println!("My circle is {:#?}", c);
    println!("My triangle is {:?}", t);
}

#[derive(Debug)]
struct Circle {
    radius: f32,
    center_x: u32,
    center_y: u32
}

impl Circle {
    fn area(&self) -> f32 {
        return &self.radius * &self.radius * 3.14;
    }
}

// fn area_of_circle(circle: &Circle) -> f32 {
//     return circle.radius * circle.radius * 3.14;
// }

#[derive(Debug)]
struct Triangle {
    base: f32,
    height: f32
}

impl Triangle {
    fn area(&self) -> f32 {
        return 0.5 * &self.base * &self.height;
    }
}

// fn area_of_triangle(triangle: &Triangle) -> f32 {
//     return 0.5 * triangle.base * triangle.height;
// }
