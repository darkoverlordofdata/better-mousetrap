/* author: pancake 2014 */
[CCode (cheader_filename = "emscripten.h")]
namespace Emscripten {

	[CCode (cname="em_arg_callback_func", has_target=false)]
	public delegate void em_arg_callback_func(void* ctx);

	[CCode (cname="EM_ASM(//")]
	public void BLOCK_START();

	[CCode (cname=");//")]
	public void BLOCK_END();

	[CCode (cname="EM_ASM(eval")]
	public void EM_ASM(string str);

	[CCode (cname="EM_ASM_INT")]
	public int INT(string str, int n, ...);

	[CCode (cname="EM_ASM_STRING")]
	public void STRING(string str, string n);

	[CCode (cname="eval")]
	public void eval(string str);

	[CCode (cname="emscripten_set_main_loop_arg")]
	public void emscripten_set_main_loop_arg(em_arg_callback_func fnc, void* ctx, int fps, int simulate_infinite_loop);
}
