// Automatically converted with https://github.com/TheLeerName/ShadertoyToFlixel

#pragma header

#define round(a) floor(a + 0.5)
#define iResolution vec3(openfl_TextureSize, 0.)
uniform float iTime;
#define iChannel0 bitmap
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
#define texture flixel_texture2D

// third argument fix
vec4 flixel_texture2D(sampler2D bitmap, vec2 coord, float bias) {
	vec4 color = texture2D(bitmap, coord, bias);
	if (!hasTransform)
	{
		return color;
	}
	if (color.a == 0.0)
	{
		return vec4(0.0, 0.0, 0.0, 0.0);
	}
	if (!hasColorTransform)
	{
		return color * openfl_Alphav;
	}
	color = vec4(color.rgb / color.a, color.a);
	mat4 colorMultiplier = mat4(0);
	colorMultiplier[0][0] = openfl_ColorMultiplierv.x;
	colorMultiplier[1][1] = openfl_ColorMultiplierv.y;
	colorMultiplier[2][2] = openfl_ColorMultiplierv.z;
	colorMultiplier[3][3] = openfl_ColorMultiplierv.w;
	color = clamp(openfl_ColorOffsetv + (color * colorMultiplier), 0.0, 1.0);
	if (color.a > 0.0)
	{
		return vec4(color.rgb * color.a * openfl_Alphav, color.a * openfl_Alphav);
	}
	return vec4(0.0, 0.0, 0.0, 0.0);
}

// variables which is empty, they need just to avoid crashing shader
uniform float iTimeDelta;
uniform float iFrameRate;
uniform int iFrame;
#define iChannelTime float[4](iTime, 0., 0., 0.)
#define iChannelResolution vec3[4](iResolution, vec3(0.), vec3(0.), vec3(0.))
uniform vec4 iMouse;
uniform vec4 iDate;

// Copyright Inigo Quilez, 2016 - https://iquilezles.org/
// I am the sole copyright owner of this Work.
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

// based on https://www.shadertoy.com/view/XdXGDS

#define AA 2

// Other "Iterations" shaders:
//
// "trigonometric"   : https://www.shadertoy.com/view/Mdl3RH
// "trigonometric 2" : https://www.shadertoy.com/view/Wss3zB
// "circles"         : https://www.shadertoy.com/view/MdVGWR
// "coral"           : https://www.shadertoy.com/view/4sXGDN
// "guts"            : https://www.shadertoy.com/view/MssGW4
// "inversion"       : https://www.shadertoy.com/view/XdXGDS
// "inversion 2"     : https://www.shadertoy.com/view/4t3SzN
// "shiny"           : https://www.shadertoy.com/view/MslXz8
// "worms"           : https://www.shadertoy.com/view/ldl3W4
// "stripes"         : https://www.shadertoy.com/view/wlsfRn


vec3 shape( in vec2 uv )
{
	float time = iTime*0.05  + 47.0;
    
	vec2 z = -1.0 + 2.0*uv;
	z *= 1.5;
    
    vec3 col = vec3(1.0);
	for( int j=0; j<48; j++ )
	{
        float s = float(j)/16.0;
        float f = 0.2*(0.5 + 1.0*fract(sin(s*20.0)));

		vec2 c = 0.5*vec2( cos(f*time+17.0*s),sin(f*time+19.0*s) );
		z -= c;
		float zr = length( z );
	    float ar = atan( z.y, z.x ) + zr*0.6;
	    z  = vec2( cos(ar), sin(ar) )/zr;
		z += c;

        // color		
        col -= 0.5*exp( -10.0*dot(z,z) )* (0.25+0.4*sin( 5.5 + 1.5*s + vec3(1.6,0.8,0.5) ));
	}
        
    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float e = 1.0/iResolution.x;

    vec3 tot = vec3(0.0);
    for( int m=0; m<AA; m++ )
    for( int n=0; n<AA; n++ )
    {        
        vec2 uv = (fragCoord+vec2(m,n)/float(AA))/iResolution.xy;
	    vec3 col = shape( uv );
        float f = dot(col,vec3(0.333));
        vec3 nor = normalize( vec3( dot(shape(uv+vec2(e,0.0)),vec3(0.333))-f, 
                                    dot(shape(uv+vec2(0.0,e)),vec3(0.333))-f, 
                                    e ) );
        col += 0.2*vec3(1.0,0.9,0.5)*dot(nor,vec3(0.8,0.4,0.2));;
	    col += 0.3*nor.z;
        tot += col;
    }
    tot /= float(AA*AA);

    tot = pow( clamp(tot,0.0,1.0), vec3(0.8,1.1,1.3) );
	
    vec2 uv = fragCoord/iResolution.xy;
    tot *= 0.4 + 0.6*pow( 16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y), 0.1 );

    fragColor = vec4( tot, texture(iChannel0, uv).a );
}

void main() {
	mainImage(gl_FragColor, openfl_TextureCoordv*openfl_TextureSize);
}